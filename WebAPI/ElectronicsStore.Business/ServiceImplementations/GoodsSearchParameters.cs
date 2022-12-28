using ElectronicsStore.Core;
using ElectronicsStore.Core.Abstractions;

namespace ElectronicsStore.Business.ServiceImplementations;

public class GoodsSearchParameters : IGoodsSearchParameters
{
    public IPaginationParameters Pagination { get; set; }
    public ICategorySearchParameters Category { get; set; }
}