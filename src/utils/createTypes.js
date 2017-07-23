export function createTypes(types = [], namespace = 'default') {
  return types.reduce((acc, type) => ({
    ...acc,
    [type]: `${namespace}/${type}`,
  }), {})
}
