import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/*
  Self-hosted so the built site renders with no network connection.
  Latin subsets only: the build inlines every font as base64, and pulling in
  cyrillic/vietnamese/greek too would roughly triple the single-file output
  for glyphs this shop never renders.
*/
import '@fontsource/fredoka/latin-400.css';
import '@fontsource/fredoka/latin-500.css';
import '@fontsource/fredoka/latin-600.css';
import '@fontsource/nunito/latin-400.css';
import '@fontsource/nunito/latin-600.css';
import '@fontsource/nunito/latin-700.css';

import './styles/tokens.css';
import './styles/global.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
