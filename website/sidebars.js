const fs = require('fs');
function getScalarSidebar() {
  const files = fs.readdirSync('./docs/scalars');
  return files.map((file) => `scalars/${file.replace('.md', '')}`);
}
module.exports = {
  sidebar: [
    'introduction',
    'quick-start',
    { Recipes: ['usage/apollo-server', 'usage/mocks', 'usage/regex'] },
    { 'Available Scalars': getScalarSidebar() },
  ],
};
