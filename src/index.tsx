import * as React from "react";
import { CroppieOptions, ResultOptions } from "croppie";
const Croppie = require("croppie").Croppie; // this is done to fix an issue with the default typings of croppie
export interface CroppieReactOpts extends CroppieOptions {
  result?: object;
}

export interface Props {
  Options: CroppieReactOpts;
  className?: string;
  styles?: object;
  result?: ResultOptions;
  OnUpdate?: (event: any) => void;
}

export interface State {
  croppieInstance: any;
  className?: string;
  styles?: object;
  result?: ResultOptions;
}

export default class CroppieWrapper extends React.Component<Props, State> {
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
      children,
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
      } as State,
      () => {
        this.state.croppieInstance.bind(other);
        document
          .getElementById("croppie-wrapper-react")
          .addEventListener("update", this.croppieUpdated.bind(this));
      }
    );
  }

  croppieUpdated(event: Croppie.CropData) {
    if (this.state.croppieInstance) {
      this.state.croppieInstance
        .result(this.state.result)
        .then((blob: Blob) => {
          event["result"] = blob;
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
