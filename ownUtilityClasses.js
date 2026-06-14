const primaryBtn = `bg-black/80 px-4 py-1.5 rounded-sm hover:outline-1 hover:outline-white/20 transition duration-300 ease-in-out text-white/50 hover:text-white cursor-pointer`;
const classToAdd = primaryBtn.split(' ');

document.querySelectorAll('.btn-primary').forEach( button => {
    button.classList.add(...classToAdd);
});