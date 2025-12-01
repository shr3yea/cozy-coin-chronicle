type PetType = "bunny" | "cat" | "bear" | "dog" | "panda";

interface PixelPetProps {
  type: PetType;
  size?: number;
}

const PixelPet = ({ type, size = 12 }: PixelPetProps) => {
  const pixelSize = size;
  
  const petPatterns: Record<PetType, string[][]> = {
    bunny: [
      ["t", "br", "t", "t", "t", "t", "br", "t"],
      ["t", "br", "t", "t", "t", "t", "br", "t"],
      ["br", "br", "br", "br", "br", "br", "br", "br"],
      ["br", "pk", "bl", "br", "br", "bl", "pk", "br"],
      ["br", "br", "br", "pk", "pk", "br", "br", "br"],
      ["br", "br", "pk", "br", "br", "pk", "br", "br"],
      ["t", "br", "br", "br", "br", "br", "br", "t"],
    ],
    cat: [
      ["t", "or", "t", "t", "t", "t", "or", "t"],
      ["or", "or", "or", "or", "or", "or", "or", "or"],
      ["or", "wh", "bl", "or", "or", "bl", "wh", "or"],
      ["or", "or", "or", "pk", "pk", "or", "or", "or"],
      ["or", "or", "pk", "or", "or", "pk", "or", "or"],
      ["or", "or", "or", "pk", "pk", "or", "or", "or"],
      ["t", "or", "or", "or", "or", "or", "or", "t"],
    ],
    bear: [
      ["t", "br", "br", "t", "t", "br", "br", "t"],
      ["br", "br", "br", "br", "br", "br", "br", "br"],
      ["br", "pk", "bl", "br", "br", "bl", "pk", "br"],
      ["br", "br", "br", "pk", "pk", "br", "br", "br"],
      ["br", "br", "pk", "pk", "pk", "pk", "br", "br"],
      ["br", "br", "br", "pk", "pk", "br", "br", "br"],
      ["t", "br", "br", "br", "br", "br", "br", "t"],
    ],
    dog: [
      ["t", "bn", "bn", "t", "t", "bn", "bn", "t"],
      ["bn", "bn", "bn", "bn", "bn", "bn", "bn", "bn"],
      ["bn", "wh", "bl", "bn", "bn", "bl", "wh", "bn"],
      ["bn", "bn", "bn", "bn", "bn", "bn", "bn", "bn"],
      ["bn", "bn", "pk", "bn", "bn", "pk", "bn", "bn"],
      ["bn", "bn", "bn", "pk", "pk", "bn", "bn", "bn"],
      ["t", "bn", "bn", "bn", "bn", "bn", "bn", "t"],
    ],
    panda: [
      ["t", "bk", "bk", "t", "t", "bk", "bk", "t"],
      ["bk", "wh", "wh", "wh", "wh", "wh", "wh", "bk"],
      ["wh", "bk", "bk", "wh", "wh", "bk", "bk", "wh"],
      ["wh", "wh", "wh", "pk", "pk", "wh", "wh", "wh"],
      ["wh", "wh", "pk", "wh", "wh", "pk", "wh", "wh"],
      ["wh", "wh", "wh", "pk", "pk", "wh", "wh", "wh"],
      ["t", "bk", "bk", "bk", "bk", "bk", "bk", "t"],
    ],
  };

  const colorMap: Record<string, string> = {
    t: "transparent",
    br: "hsl(30, 40%, 60%)", // brown
    pk: "hsl(15, 70%, 75%)", // pink
    bl: "hsl(0, 0%, 10%)", // black
    wh: "hsl(0, 0%, 95%)", // white
    or: "hsl(25, 85%, 65%)", // orange
    bn: "hsl(35, 50%, 50%)", // tan/beige
    bk: "hsl(0, 0%, 15%)", // dark for panda
  };

  const pattern = petPatterns[type];

  return (
    <div
      className="inline-block"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(8, ${pixelSize}px)`,
        gridTemplateRows: `repeat(${pattern.length}, ${pixelSize}px)`,
        gap: "1px",
        imageRendering: "pixelated",
      }}
    >
      {pattern.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <div
            key={`${rowIndex}-${cellIndex}`}
            style={{
              width: `${pixelSize}px`,
              height: `${pixelSize}px`,
              backgroundColor: colorMap[cell],
              borderRadius: cell === "t" ? "0" : "1px",
            }}
          />
        ))
      )}
    </div>
  );
};

export default PixelPet;
