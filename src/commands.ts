import {EditorView} from "@codemirror/view"
import { App, Editor, MarkdownView, Notice, View, Workspace } from 'obsidian';
import DebugPlugin from "./main"

export function addCommands(plugin_this: DebugPlugin){
  
  for (let i=0; i<command_list_1.length; i++){
    let command_item = command_list_1[i]
    this.addCommand({
      id: 'debug-tool-'+i,
      name: command_item.name,
      callback: command_item.callback
    });
  }
}

/** 命令列表 */
export let command_list_1 = [
  {
    name: "（先运行该命令）指定编辑器",
    callback: () => {
      let name = "（先运行该命令）指定编辑器"
      if (is_change_view == true){
        let editVar = get_edit_variable(); if (!editVar) {console.log(`【${name}】 \n变量获取失败。请先确保先聚焦到md文档再运行此命令`); return}
        is_change_view = false
        console.log(`【${name}】\n`, "指定成功");
      } else {
        is_change_view = true
        console.log(`【${name}】\n`, "解锁成功");
      }
    }
  }
]

function evalPro(str: string) {
  var Fn = Function;
  return new Fn('return ' + str)();
}

/** 命令列表 */
export let command_list = [
  {
    name: "手册类",
    children: [
      {
        name: "获取常用编程手册",
        callback: () => {
          let name = "获取常用编程手册"
          console.log(`【${name}】\n${help_doc}`);
        }
      },
    ]
  },
  {
    name: "编辑器类",
    children: [
      {
        name: "（慎用）运行选中片段",
        callback: () => {
          let name = "（慎用）运行选中片段"
          let editVar = get_edit_variable(); if (!editVar) {console.log(`【${name}】 \n变量获取失败。请先聚焦到md文档并Ctrl+P运行：指定编辑器`); return}
          console.log(`【${name}】\n`, "(↓↓↓)");
          try{
            evalPro(editVar.editor.getSelection())
          }
          catch{
            console.log("cann't use eval function")
          }
        }
      },
      {
        name: "获取view、editor、editorView",
        callback: () => {
          let name = "获取view、editor、editorView"
          let editVar = get_edit_variable(); if (!editVar) {console.log(`【${name}】 \n变量获取失败。请先聚焦到md文档并Ctrl+P运行：指定编辑器`); return}
          console.log(`【${name}】\n`, editVar);
        }
      },
      {
        name: "获取光标相关",
        callback: () => {
          let name = "获取光标相关"
          let editVar = get_edit_variable(); if (!editVar) {console.log(`【${name}】 \n变量获取失败。请先聚焦到md文档并Ctrl+P运行：指定编辑器`); return}
          console.log(`【${name}】`,
          "\n【光标的位置】\n", `第${editVar.editor.getCursor().line}行的第${editVar.editor.getCursor().ch}个字符`,
          "\n【选择的内容】\n", editVar.editor.getSelection());
        }
      },
      {
        name: "获取md全文",
        callback: () => {
          let name = "获取md全文"
          let editVar = get_edit_variable(); if (!editVar) {console.log(`【${name}】 \n变量获取失败。请先聚焦到md文档并Ctrl+P运行：指定编辑器`); return}
          console.log(`【${name}】`,
          "\n【总行数】\n", editVar.editor.lineCount(), 
          "\n【内容】\n", editVar.editor.getValue());
        }
      },
      {
        name: "获取md编辑器dom",
        callback: () => {
          let name = "获取md编辑器dom"
          let editVar = get_edit_variable(); if (!editVar) {console.log(`【${name}】 \n变量获取失败。请先聚焦到md文档并Ctrl+P运行：指定编辑器`); return}
          console.log(`【${name}】\n`, prev_md_dom);
        }
      },
      {
        name: "获取md编辑器显示模式",
        callback: () => {
          let name = "获取md编辑器显示模式"
          let editVar = get_edit_variable(); if (!editVar) {console.log(`【${name}】 \n变量获取失败。请先聚焦到md文档并Ctrl+P运行：指定编辑器`); return}
          let dom = prev_md_dom?.getElementsByClassName("workspace-leaf-content")[0]
          let data_mode = dom?.getAttribute("data-mode")
          if (data_mode=="source") {
            dom = dom?.getElementsByClassName("markdown-source-view")[0]
            if(dom?.classList.contains('is-live-preview')) data_mode="实时模式"
            else data_mode="源码模式"
          }
          else if (data_mode=="preview") data_mode="渲染模式"
          console.log(`【${name}】\n`, data_mode);
        }
      },
    ]
  },
  {
    name: "DOM类",
    children: [
      {
        name: "打印document",
        callback: () => {
          let name = "打印document"
          console.log(`【${name}】\n`, document);
        }
      },
      {
        name: "打印当前主workspace-leaf",
        callback: () => {
          let name = "打印当前主workspace-leaf"
          console.log(`【${name}】\n`, document.getElementsByClassName("mod-root"))
        }
      },
      {
        name: "打印当前活动窗口",
        callback: () => {
          let name = "打印当前活动窗口"
          console.log(`【${name}】\n`, document.getElementsByClassName("mod-active"));
        }
      },
    ]
  },
  {
    name: "监听类",
    children: [
      {
        name: "启用事件监听",
        callback: () => {
          let name = "启用事件监听"
          console.log(`【${name}】\n（该功能未实现）`);
        }
      },
    ]
  },
  {
    name: "dvjs类",
    children: [
      {
        name: "dvjs - 获取当前文档",
        callback: () => {
          let name = "dvjs - 获取当前文档"
          let editVar = get_edit_variable(); if (!editVar) {console.log(`【${name}】 \n变量获取失败。请先聚焦到md文档并Ctrl+P运行：指定编辑器`); return}
          let dvjsContent = `console.log("【${name}】\\n", dv.current().file)`
          editVar.editor.replaceSelection(
            "\n```dataviewjs\n"+
            `${dvjsContent}\n`+
            `dv.list(["【${name}】输出见控制台"])\n`+
            "```\n"
          )
        }
      },
      {
        name: "dvjs - 获取当前库",
        callback: () => {
          let name = "dvjs - 获取当前库"
          let editVar = get_edit_variable(); if (!editVar) {console.log(`【${name}】 \n变量获取失败。请先聚焦到md文档并Ctrl+P运行：指定编辑器`); return}
          let dvjsContent = `console.log("【${name}】\\n", app.vault.getMarkdownFiles())`
          editVar.editor.replaceSelection(
            "\n```dataviewjs\n"+
            `${dvjsContent}\n`+
            `dv.list(["【${name}】输出见控制台"])\n`+
            "```\n"
          )
        }
      },
    ]
  }
]

/** 获取编辑相关的变量 */
let is_change_view = true
let prev_view: View|null = null
let prev_md_dom: Element|null = null
function get_edit_variable(){
  if (is_change_view) {
    prev_view = this.app.workspace.getActiveViewOfType(MarkdownView); // 未聚焦到md文档会返回null
    let doms = document.getElementsByClassName("workspace-tabs mod-top mod-active")
    if (doms && doms.length) {
      prev_md_dom = doms[0].getElementsByClassName("workspace-leaf mod-active")[0]
    }
  }
  if (!prev_view) return null
    // @ts-ignore 这里会说View没有editor属性
  const editor: Editor = prev_view.editor
      // @ts-ignore 这里会说Editor没有cm属性
  const editorView: EditorView = editor.cm
  return {
    view: prev_view, 
    editor: editor, 
    editorView: editorView
  }
}

const help_doc = 
`Obsidian相关
- 官网帮助文档：https://publish.obsidian.md/help-zh/（没啥用）
- 插件开发
    - 示例插件：https://github.com/obsidianmd/obsidian-sample-plugin
    - API：https://github.com/obsidianmd/obsidian-api
- 官方在B站有个账号，里面有一点教程，不过英文版
- API文档
    （刚开始找来找去找不到，官网好像没文档。后来在论坛找到了，但应该不是官方弄的）
    - 开发者文档：https://marcus.se.net/obsidian-plugin-docs/
    - ==中文社区网友的翻译==：https://luhaifeng666.github.io/obsidian-plugin-docs-zh/zh2.0/（文档）
        https://forum-zh.obsidian.md/t/topic/9352/2（论坛）
        翻译自 [这篇文章](https://marcus.se.net/obsidian-plugin-docs/user-interface/context-menus) / https://marcus.se.net/obsidian-plugin-docs/vault
        （自翻译了一部分，看原文很有必要。像Vault这种东西翻译版就没有）

CodeMirror相关
- 官网手册（但是太文档化了，有些隐晦难懂）
  - 系统指南：https://codemirror.net/docs/guide/
  - 参考手册：https://codemirror.net/docs/ref/
  - 例子：https://codemirror.net/examples/，里面的 “编程接口” 一项较重要
  - 在线运行环境demo：https://codemirror.net/try/，自带5个Example
`