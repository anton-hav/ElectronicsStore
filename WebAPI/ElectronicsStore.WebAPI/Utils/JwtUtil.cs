using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ElectronicsStore.Core.Abstractions.Services;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.WebAPI.Models.Responses;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace ElectronicsStore.WebAPI.Utils;

public class JwtUtilSha256 : IJwtUtil
{
    private readonly IConfiguration _configuration;
    private readonly IRefreshTokenService _refreshTokenService;

    public JwtUtilSha256(IConfiguration configuration, 
        IRefreshTokenService refreshTokenService)
    {
        _configuration = configuration;
        _refreshTokenService = refreshTokenService;
    }

    public async Task<TokenResponse> GenerateTokenAsync(UserDto dto)
    {
        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:JwtSecret"]));
        var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
        var nowUtc = DateTime.UtcNow;
        var exp = nowUtc.AddMinutes(double.Parse(_configuration["Token:ExpiryMinutes"]))
            .ToUniversalTime();

        var claims = new List<Claim>()
        {
            new Claim(JwtRegisteredClaimNames.Sub, dto.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("D")), //jwt uniq id from spec
            new Claim(ClaimTypes.NameIdentifier, dto.Id.ToString("D")),
            new Claim(ClaimTypes.Role, dto.Role.Name),
        };

        var jwtToken = new JwtSecurityToken(_configuration["Token:Issuer"],
            _configuration["Token:Issuer"],
            claims,
            expires: exp,
            signingCredentials: credentials);

        var accessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);
        
        var refreshTokenValue = Guid.NewGuid();

        await _refreshTokenService.CreateRefreshTokenAsync(refreshTokenValue, dto.Id);
        
        return new TokenResponse()
        {
            AccessToken = accessToken,
            Role = dto.Role.Name,
            TokenExpiration = jwtToken.ValidTo,
            UserId = dto.Id,
            RefreshToken = refreshTokenValue
        };
    }

    public async Task RemoveRefreshTokenAsync(Guid requestRefreshToken)
    {
        await _refreshTokenService.RemoveRefreshTokenAsync(requestRefreshToken);
    }
}