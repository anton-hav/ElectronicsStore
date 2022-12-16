namespace ElectronicsStore.Core.DataTransferObjects;

public class RefreshTokenDto
{
    public Guid Id { get; set; }
    public Guid Token { get; set; }
    public Guid UserId { get; set; }
    public UserDto User { get; set; }
}