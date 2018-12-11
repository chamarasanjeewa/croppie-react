import * as React from "react";
const Croppie = require("croppie").Croppie; // this is done to fix an issue with the default typings of croppie

export type Props = {
  Options: object;
  className: string;
  styles: object;
  result: object;
  OnUpdate: (event: any) => void;
};

export default class CroppieWrapper extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = { croppieInstance: null };
  }

  componentDidMount() {
    const {
      Options,
      className,
      styles,
      result = { type: "blob" },
      ...other
    } = this.props;
    this.setState(
      {
        croppieInstance: new Croppie(
          document.getElementById("croppie-wrapper-react") as HTMLElement,
          Options
        ),
        className,
        styles,
        result
      },
      () => {
        this.state.croppieInstance.bind(other);
        document
          .getElementById("croppie-wrapper-react")
          .addEventListener("update", this.croppieUpdated.bind(this));
      }
    );
  }

  croppieUpdated(event: any) {
    if (this.state.croppieInstance) {
      this.state.croppieInstance.result(this.state.result).then((blob: any) => {
        event.result = blob;
        return this.props.OnUpdate(event);
      });
    } else {
      return this.props.OnUpdate(event);
    }
  }

  componentWillUnmount() {
    this.state.croppieInstance && this.state.croppieInstance.destroy();
  }

  render() {
    return (
      <div
        className={this.state.className || ""}
        style={this.state.styles || null}
        id="croppie-wrapper-react"
      />
    );
  }
}
