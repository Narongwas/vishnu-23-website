export function colorGroup(type: "bg" | "fill", group: string) {
  const bgMap: Record<string, string> = {
    A: "bg-A",
    B: "bg-B",
    C: "bg-C",
    Dog: "bg-Dog",
    E: "bg-E",
    F: "bg-F",
    G: "bg-G",
    H: "bg-H",
    J: "bg-J",
    K: "bg-K",
    L: "bg-L",
    M: "bg-M",
    N: "bg-N",
    P: "bg-P",
    Q: "bg-Q",
    R: "bg-R",
    S: "bg-S",
    T: "bg-T",
    black: "bg-black",
    white: "bg-white",
    red: "bg-red",
  };

  const fillMap: Record<string, string> = {
    A: "fill-A",
    B: "fill-B",
    C: "fill-C",
    Dog: "fill-Dog",
    E: "fill-E",
    F: "fill-F",
    G: "fill-G",
    H: "fill-H",
    J: "fill-J",
    K: "fill-K",
    L: "fill-L",
    M: "fill-M",
    N: "fill-N",
    P: "fill-P",
    Q: "fill-Q",
    R: "fill-R",
    S: "fill-S",
    T: "fill-T",
    black: "fill-black",
    white: "fill-white",
    red: "fill-red",
  };
  if (type === "bg") {
    return bgMap[group];
  }

  if (type === "fill") {
    return fillMap[group];
  }

  return undefined;
}
