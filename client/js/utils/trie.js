import Trie from 'triejs';

// Create a new trie
const autoCompleteTrie = new Trie();
const suggestions = [
    'sushi',
    'sushi something else',
    'sushi blah'
];

for (const suggestion of suggestions) {
    autoCompleteTrie.add(suggestion);
}

export default autoCompleteTrie;
