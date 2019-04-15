module.exports = function core() {
  return ({ types }) => ({
    visitor: {
      ImportDeclaration(path, {opts}) {
        const specifiers = path.node.specifiers;
        if (!types.isImportDefaultSpecifier(specifiers[0]) && !types.isImportNamespaceSpecifier(specifiers[0])) {
					const declarations = specifiers.map((specifier) => {
						return types.ImportDeclaration([types.ImportDefaultSpecifier(specifier.local)],
							types.StringLiteral(opts.customSourceFunc(specifier.imported.name)));
					});
					path.replaceWithMultiple(declarations);
				}
      }
    }
  })
}