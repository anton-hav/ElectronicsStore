namespace ElectronicsStore.Core.DataTransferObjects;

public class RoleDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }

    public List<UserDto> Users { get; set; }
}