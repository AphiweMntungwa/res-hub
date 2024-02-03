'use client'
import { Stage, Layer, Rect, Circle, Line, Group } from 'react-konva';

interface MorrisBoardProps { }

const MorrisBoard: React.FC<MorrisBoardProps> = () => {
  // Define the positions for the intersections of the board.
  const gridPositions: [number, number][] = [
    // Outer square
    [100, 100], [300, 100], [500, 100], // Top row
    [100, 300], [500, 300],             // Middle row
    [100, 500], [300, 500], [500, 500], // Bottom row

    // Middle square
    [200, 200], [300, 200], [400, 200], // Top row
    [200, 300], [400, 300],             // Middle row
    [200, 400], [300, 400], [400, 400], // Bottom row

    // Inner square
    [300, 300], [400, 300], [500, 300], // Top row
    [300, 400], [500, 400],             // Middle row
    [300, 500], [400, 500], [500, 500], // Bottom row
  ];



  // Create grid lines using Konva's Line
  const gridLines = gridPositions.map((position, index) => (
    <Line
      key={index}
      points={position}
      stroke="black"
      strokeWidth={2}
    />
  ));

  // Add Circles for Intersection Points using Konva's Circle
  const intersectionPoints = gridPositions.map((position, index) => (
    <Circle
      key={index}
      x={position[0]}
      y={position[1]}
      radius={5}
      fill="black"
    />
  ));

  // Handle click on an intersection point
  const handleIntersectionClick = (event: any) => {
    const clickedIntersection = event.target;
    // Handle click logic here
  };

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {/* Render grid lines */}
        {gridLines}

        {/* Render intersection points */}
        {intersectionPoints.map((point, index) => (
          <Group key={index} onClick={handleIntersectionClick}>
            {point}
          </Group>
        ))}
      </Layer>
    </Stage>
  );
}

export default MorrisBoard;