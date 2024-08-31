export const toPascalCase = (input: string): string => {
  return input
  .toLowerCase()       
  .replace(/(?:^\w|[A-Z]|\b\w)/g, (match) => 
      match.toUpperCase()
  );
}

