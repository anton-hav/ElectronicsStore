using AutoMapper;
using ElectronicsStore.Core.Abstractions.Services;
using ElectronicsStore.Data.Abstractions;
using ElectronicsStore.DataBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace ElectronicsStore.Business.ServiceImplementations;

public class RefreshTokenService :IRefreshTokenService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public RefreshTokenService(IMapper mapper, 
        IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    /// <inheritdoc />
    public async Task<int> CreateRefreshTokenAsync(Guid tokenValue, Guid userId)
    {
        var rt = new RefreshToken()
        {
            Id = Guid.NewGuid(),
            Token = tokenValue,
            UserId = userId
        };

        await _unitOfWork.RefreshToken.AddAsync(rt);
        var result = await _unitOfWork.Commit();
        return result;
    }

    /// <inheritdoc />
    public async Task<int> RemoveRefreshTokenAsync(Guid tokenValue)
    {
        var token = await _unitOfWork.RefreshToken
            .Get()
            .FirstOrDefaultAsync(token => token.Token.Equals(tokenValue));
        
        if (token != null)
            _unitOfWork.RefreshToken.Remove(token);

        return await _unitOfWork.Commit();
    }
}