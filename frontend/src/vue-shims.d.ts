/**
 * Déclarations de type pour les fichiers Vue
 * Ce fichier permet à TypeScript de reconnaître les fichiers .vue comme des modules
 * et résout les erreurs de type dans le routeur
 * 
 * @author PASS.MAEGE Team
 * @version 1.0.0
 */

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
