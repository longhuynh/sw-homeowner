
export const jsonItemsBuilder = (pairs) => {
  let stringBuilder = '';

  pairs.forEach(p => {
    stringBuilder += `{\"queryName\":\"${p.name}\",\"value\":\"${p.value}\"},`;
  });

  stringBuilder = stringBuilder.slice(0, stringBuilder.length - 1);

  return { jsonItems: `[${stringBuilder}]` };
}
