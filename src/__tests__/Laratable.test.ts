import Laratable from '../laratable';

test('Constructor testing', () => {
  document.body.innerHTML = `<table class="laratable"><thead><tr><td>Name</td><td>Acions</td></tr></thead></table>`;
  const table = new Laratable(
    '.laratable',
    'test.html',
    [
      {
        name: 'name',
      },
      {
        name: 'actions',
        searchable: false,
      },
    ],
    {},
  );
  expect(table).toBeInstanceOf(Laratable);
});
