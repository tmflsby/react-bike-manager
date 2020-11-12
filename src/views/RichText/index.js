import React, { Component, Fragment } from "react";
import { Card, Button, Modal } from "antd";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./index.less";

class RichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      showRichText: false
    };
  }

  //清空富文本内容
  handleClearContent = () => {
    this.setState({
      editorState: EditorState.createEmpty()
    });
  }

  // 获取当前文本内容
  handleGetText = () => {
    this.setState({
      showRichText: true
    });
  }

  // htmlToDraft
  handleSubmit = () => {
    let templateContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    let blocksFromHTML = htmlToDraft(templateContent);
    console.log('HTML: ', templateContent);
    console.log('Draft: ', blocksFromHTML);
  }

  // 实时更新当前编辑器的内容
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  // 实时更新当前文本的内容
  onContentStateChange = (contentState) => {
    this.setState({
      contentState
    });
  }

  // 取消显示富文本Modal
  handleModalCancel = () => {
    this.setState({
      showRichText: false
    });
  }

  render() {
    return (
      <Fragment>
        <Card>
          <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
          <Button type="primary" onClick={this.handleGetText} style={{margin: "0 15px"}}>获取HTML文本</Button>
          <Button type="primary" onClick={this.handleSubmit}>HTML转Draft</Button>
        </Card>
        <Card title="富文本编辑器" style={{marginTop: 20}}>
          <Editor editorState={this.state.editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={this.onEditorStateChange}
                  onContentStateChange={this.onContentStateChange}
          />
          <textarea disabled className="textArea"
                    value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
          />
        </Card>
        <Modal title="富文本" visible={this.state.showRichText}
               onCancel={this.handleModalCancel}
               footer={null}
        >
          {draftToHtml(this.state.contentState)}
        </Modal>
      </Fragment>
    )
  }
}

export default RichText;
