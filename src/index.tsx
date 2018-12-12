import * as React from "react";
import { CroppieOptions, ResultOptions } from "croppie";
const Croppie = require("croppie").Croppie; // this is done to fix an issue with the default typings of croppie
export interface CroppieReactOpts extends CroppieOptions {
  result?: object;
}

export interface Props {
  options: CroppieReactOpts;
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
  private croppieElement: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.state = { croppieInstance: null };
    this.croppieElement = React.createRef();
  }

  componentDidMount() {
    const {
      options,
      className,
      styles,
      result = { type: "blob" },
      children,
      ...other
    } = this.props;
    this.setState(
      {
        croppieInstance: new Croppie(this.croppieElement.current as HTMLDivElement, options),
        className,
        styles,
        result
      } as State,
      () => {
        this.state.croppieInstance.bind(other);
        this.croppieElement.current.addEventListener(
          "update",
          this.croppieUpdated.bind(this)
        );
      }
    );
  }

  croppieUpdated(event: Croppie.CropData) {
    if (this.state.croppieInstance && this.props.OnUpdate) {
      this.state.croppieInstance
        .result(this.state.result)
        .then((blob: Blob) => {
          event["result"] = blob;
          return this.props.OnUpdate(event);
        });
    } else {
      return this.props.OnUpdate ? this.props.OnUpdate(event) : null;
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
        ref={this.croppieElement}
      />
    );
  }
}
