export default function core() {
  return ({ types }) => {
    visitor: {
      ImportDeclaration(path, {opts}) {
        const specifiers = path.node.specifiers;
        const source = path.node.source;
      };
    }
  }
}