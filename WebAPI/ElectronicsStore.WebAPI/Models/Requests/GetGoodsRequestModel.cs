using ElectronicsStore.Core.DataTransferObjects;

namespace ElectronicsStore.WebAPI.Models.Requests
{
    /// <summary>
    /// Request model to get goods
    /// </summary>
    public class GetGoodsRequestModel
    {
        private const int MaxPageSize = 100;
        private int _pageSize = 10;

        /// <summary>
        /// Search parameter that represents the page number.
        /// The default value is 1.
        /// </summary>
        public int PageNumber { get; set; } = 1;

        /// <summary>
        /// Search parameter that represents the number of goods on the page.
        /// The default value is 10. The maximum value is 100. 
        /// </summary>
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value is > 0 and > MaxPageSize ? MaxPageSize : value;
        }

        /// <summary>
        /// Search parameter that represents the goods category unique identifier.
        /// To ignore the search parameter, the value must be empty.
        /// </summary>
        public Guid? CategoryId { get; set; }

        /// <summary>
        /// Search parameter that represents the "Price From" price filter value.
        /// To ignore the search parameter, the value must be empty.
        /// </summary>
        public int? From { get; set; }

        /// <summary>
        /// Search parameter that represents the "Price To" price filter value.
        /// To ignore the search parameter, the value must be empty.
        /// </summary>
        public int? To { get; set; } = null;

        /// <summary>
        /// Search parameter that represents the brand filter values as an array of brand names.
        /// To ignore the search parameter, the value must be empty.
        /// </summary>
        public string[]? Brands { get; set; }

        /// <summary>
        /// Search parameter that represents the user search filter as an array of custom search options.
        /// </summary>
        public string[]? Finds { get; set; }
    }
}
