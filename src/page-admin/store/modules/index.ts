import PageModule from "./page";
import EditorModule from "./editor";

export const PageStore = PageModule.module();
export const EditorStore = EditorModule.module();
export const watchPageState = PageModule.watchState;
