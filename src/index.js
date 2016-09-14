import _ from 'lodash';

/**
 * Determines if the given directive is an 'ngInject' directive.
 * @param {Object} d The Directive node from Babylon.
 */
const isInjectDirective = d => d.value.value === 'ngInject';


/**
 * Babel plugin to automatically annotate functions for Angular dependency injection.
 * @param {Object} babel The current babel object.
 * @param {Object} babel.types babel-types
 * @return {Object} Babel visitor.
 */
export default function ({ types: t }) {
  const functionVisitor = (path) => {
    // Check if we should inject
    if (!_.some(path.node.body.directives, isInjectDirective)) return;
    // Remove ngInject directive
    path.node.body.directives = _.reject( // eslint-disable-line no-param-reassign
      path.node.body.directives,
      isInjectDirective
    );
    // Construct array for injection annotations
    const arr = _.map(path.node.params, p => t.stringLiteral(p.name));
    arr.push(path.node);
    // Replace function with array
    path.replaceWith(t.arrayExpression(arr));
  };
  return {
    visitor: {
      ArrowFunctionExpression: functionVisitor,
      FunctionExpression: functionVisitor,
    },
  };
}
