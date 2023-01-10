import { useEffect, useState } from "react";


export interface visualParts {
  percentage: any;
  from: string;
  to:string;
}

export interface progressBar {
  label: string;
  backgroundColor: string;
  visualParts: [visualParts];
}

function ProgressBar({
  label,
  backgroundColor = "#e5e5e5",
  // expected format for visual parts
  visualParts = [
    {
      percentage: "0%",
      from: "white",
      to:"white"
    },
  ],
}: progressBar) {
  // Starting values needed for the animation
  // Mapped by "visualParts" so it can work with multiple values dynamically
  // It's an array of percentage widths
  const [widths, setWidths] = useState(
    visualParts.map(() => {
      return 0;
    })
  );

  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // You need to wrap it to trigger the animation
    requestAnimationFrame(() => {
      // Set a new array of percentage widths based on the props
      setWidths(
        visualParts.map((item) => {
          return item.percentage;
        })
      );
    });
  }, [visualParts]);

  return (
    <>
      <div className="text-md">{label}</div>
      <div
        className='h-8 rounded-sm flex mt-3 '
        // to change the background color dynamically
        // style={{
        //   backgroundColor,
        // }}
      >
        {visualParts.map((item, index) => {
          // map each part into separate div and each will be animated
          // because of the "transition: width 2s;" css in class "progressVisualPart"
          // and because of the new width ("widths[index]", previous one was 0)
          return (
            <div
              // There won't be additional changes in the array so the index can be used
              /* eslint-disable-next-line react/no-array-index-key */
              key={index}
              style={{
                width: widths[index],
                // setting the actual color of bar part
                
              }}
              className={`progressVisualPart bg-gradient `+ `from-${item.from} to-${item.to}` }
            />
          );
        })}
      </div>
    </>
  );
}

export default ProgressBar;
