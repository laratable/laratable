import Laratable from '../index';

test('Constructor testing', () => {
  document.body.innerHTML = `<table class="laratable"><thead><tr><td>Name</td><td>Acions</td></tr></thead></table>`;
  const table = Laratable.view('.laratable', {
    url: 'test.html',
    columns: [
      { name: 'name', },
      { name: 'actions', orderable: false, searchable: false, },
    ],
    options: {},
  });
  expect(table).toBeUndefined();
});
