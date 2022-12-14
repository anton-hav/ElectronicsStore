namespace ElectronicsStore.DataBase.Entities;

public class Role : IBaseEntity
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public List<User> Users { get; set; }
}