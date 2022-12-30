export default function BrandFilterBar(props) {
  data = [
    {
      id: "5020e248-4e50-46d6-881d-49ef9a19f41d",
      name: "Brand #1",
    },
    {
      id: "0b0c9950-4ca6-45f4-aa47-aae2fbfe7902",
      name: "Brand #2",
    },
    {
      id: "6f65a8e2-b198-4138-b255-d95c237dfb01",
      name: "Brand #3",
    },
    {
      id: "f6118ecf-1b6a-4591-8d97-33e094fb5462",
      name: "Brand #4",
    },
    {
      id: "e7a3c0e5-bb49-4d28-a7ae-d8a9692ec705",
      name: "Brand #5",
    },
    {
      id: "55cff9f8-fee2-4a89-999a-f43108b8fa86",
      name: "Brand #6",
    },
  ];

  const [value1, setValue1] = React.useState([20, 37]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value1}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
}
