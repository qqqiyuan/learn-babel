module.exports = function core() {
  return ({ types }) => ({
    visitor: {
      ImportDeclaration(path, {opts}) {
        const specifiers = path.node.specifiers;
        // opts.length = import的次数
        // 只针对指定的组件库进行处理
        if (Array.isArray(opts)) {
          if (!opts.find(opt => opt.libraryName && opt.libraryName === path.node.source.value)) {
            return;
          }
        } else {
          if (opts.libraryName && (opts.libraryName !== path.node.source.value)) {
            return;
          }
        }
        // isImportDefaultSpecifier => import antd from 'antd'
        // isImportNamespaceSpecifier => import * as UI from 'antd'
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