namespace ElectronicsStore.Core.DataTransferObjects;

/// <summary>
///     Presents information about goods in the store
/// </summary>
public class ItemDto
{
    /// <summary>
    ///     An unique identifier
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    ///     An unique identifier of the product
    /// </summary>
    public Guid ProductId { get; set; }

    /// <summary>
    ///     Short summary of the product
    /// </summary>
    public string Summary { get; set; }

    /// <summary>
    ///     Description of the product
    /// </summary>
    /// <remarks>
    ///     Product descriptions are determined by the seller.
    ///     It may or may not coincide with the manufacturer's description of the product.
    ///     The description depends on the time the product is on sale,
    ///     its intended use and the target audience.
    ///     The above parameters are only taken into account by the manufacturer at the time of product launch.
    ///     The seller's description is more relevant.
    /// </remarks>
    public string Description { get; set; }

    /// <summary>
    ///     The cost of the product in the store.
    /// </summary>
    public double Cost { get; set; }

    /// <summary>
    ///     An unique identifier of the item category.
    /// </summary>
    public Guid CategoryId { get; set; }

    /// <summary>
    ///     Product
    /// </summary>
    /// <remarks>
    ///     Navigation property
    /// </remarks>
    public ProductDto Product { get; set; }

    /// <summary>
    ///     Category
    /// </summary>
    /// <remarks>
    ///     Navigation property
    /// </remarks>
    public CategoryDto Category { get; set; }
}