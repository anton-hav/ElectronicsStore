using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace ElectronicsStore.Core;

/// <summary>
/// Order status.
/// </summary>
[JsonConverter(typeof(StringEnumConverter))]
public enum OrderStatus
{
    Created = 0,
    Confirmed = 1,
    Delivered = 2,
    Cancelled = 3,
}