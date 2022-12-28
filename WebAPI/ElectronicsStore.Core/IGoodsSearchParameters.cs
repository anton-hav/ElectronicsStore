using ElectronicsStore.Core.Abstractions;

namespace ElectronicsStore.Core;

public interface IGoodsSearchParameters
{
    IPaginationParameters Pagination { get; set; }
    ICategorySearchParameters Category { get; set; }
}