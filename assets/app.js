// import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
// const root = createRoot(document.getElementById('app'));
// root.render(<h1>Hello, world</h1>);

/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.scss';

console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');
