namespace ElectronicsStore.DataBase.Entities;

public class RefreshToken : IBaseEntity
{
    public Guid Id { get; set; }
    public Guid Token { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }
}