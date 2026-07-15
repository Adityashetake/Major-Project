Templates are split into four folders consumed by an Express/EJS engine:
- `layouts/boilerplate.ejs` is the single page shell — it loads Bootstrap 5, Font Awesome, Google Fonts, and a local `/css/style.css`, then injects `includes/navbar.ejs`, `includes/flash.ejs`, the `<%-body%>` slot, and `includes/footer.ejs`.
- `includes/` holds reusable fragments (`navbar.ejs`, `flash.ejs`, `footer.ejs`) referenced via relative `<%-include("../includes/...") %>` paths from the layout.
- Feature view directories (`listings/`, `users/)` mirror controller routes: `listings/{index,new,edit,show}.ejs` and `users/{login,signup}.ejs`. Each view starts with `<% layout("/layouts/boilerplate") %>` to opt into the shell.
- `error.ejs` sits at the root as a top-level error page outside any layout.
Dependency direction is one-way: views → includes → layout; views never include each other directly, keeping cross-view coupling minimal.