# Laratable

A Vanilla JS AJAX Library to make dynamic HTML Tables for Laravel's Eloquent.


# Why?

Since Laravel is nice, you deserve a nice dynamic table as well! 

It was craft with Laravel's Eloquent in mind, so if you love Laravel, you'll probably love Laratable too.

Don't feel shy and let me know if you find any issues, or have any suggestion!


# Getting Started

You can install Laratable as any ordinary NPM package:

`npm install @laratable/laratable`


Then, you need to have a view rendering a semantic table: 


```
 <table class="laratable table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Bith Date</th>
          <th>Gender</th>
          <th>Actions</th>
        </tr>
      </thead>
    </table>
```

__IMPORTANT:__ _By semantic its meant to have __TABLE > THEAD > TR > TD|TH__ HTML Elements. If the table is somehow not displayed, please check you browser's console in order to get detailed error messages to help you correct any possible mistakes._


And instanciate `Laratable` with some required options:

```
Laratable.view('.laratable', {
  url: '/employees',
  columns: [
    { name: 'id', },
    { name: 'first_name', },
    { name: 'last_name', },
    { name: 'birth_date' },
    { name: 'gender', },
    { name: 'actions', searchable: false, orderable: false, }
  ],
});

```

The API is too simple, just pay attention and you'll figure it out by yourself.



# Styling

Since it's just a wrapper for your tables, you can use whatever styles you already have. Just for the sake of practicality, this guide uses Bootstrap 4.
Don't feel shy to use the CSS framework you love!



