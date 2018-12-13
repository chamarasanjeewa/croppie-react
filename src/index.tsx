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
  private croppieInstance: any = null;
  constructor(props: Props) {
    super(props);
    this.state = { croppieInstance: null };
    this.croppieElement = React.createRef();
  }

  componentDidMount() {
    const { options, ...other } = this.props;
    this.croppieInstance = new Croppie(
      this.croppieElement.current as HTMLDivElement,
      options
    );

    this.croppieInstance.bind(other);
    this.croppieElement.current.addEventListener(
      "update",
      this.croppieUpdated.bind(this)
    );
  }

  shouldComponentUpdate() {
    if (this.croppieInstance) {
      return false;
    }
    return true;
  }

  croppieUpdated(event: Croppie.CropData) {
    const { result = { type: "blob" } } = this.props;
    if (this.croppieInstance && this.props.OnUpdate) {
      this.croppieInstance.result(result).then((blob: Blob) => {
        event["result"] = blob;
        return this.props.OnUpdate(event);
      });
    } else {
      return this.props.OnUpdate ? this.props.OnUpdate(event) : null;
    }
  }

  componentWillUnmount() {
    this.croppieInstance && this.croppieInstance.destroy();
  }

  render() {
    return (
      <div
        className={this.props.className || ""}
        style={this.props.styles || null}
        id="croppie-wrapper-react"
        ref={this.croppieElement}
      />
    );
  }
}
