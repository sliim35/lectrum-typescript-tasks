const root = '/';
const profile = '/profile';
const panel = '/panel';
const starship = '/panel/:starship';
const registration = '/registration';

type BookType = Readonly<{
    root: typeof root;
    profile: typeof profile;
    panel: typeof panel;
    starship: typeof starship;
    registration: typeof registration;
}>;

export const book: BookType = Object.freeze({
    root,
    profile,
    panel,
    starship,
    registration,
});
