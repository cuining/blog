import React from 'react'

const ERROR_EMOJIS = [
  '(^Д^)/',
  '(·.·)',
  '(˚Δ˚)b',
  '(·_·)',
  '(^_^)b',
  '(>_<)',
  '(o^^)o',
  '(;-;)',
  '(≥o≤)',
  '(o_o)/',
  '(^-^*)',
  "(='X'=)"
]

const ERROR_MESSAGE = {
  GENERIC_ERROR: 'Something went wrong. Please try again soon.',
  NO_RESULTS: 'No Results found!',
  PAGE_NOT_FOUND: 'Unfortunately, this page doesn&apos;t exist.',
  UNSUPPORTED_BROWSER:
    'Your browser is not currently supported. Google Fonts works best on Chrome, Firefox, Edge and Safari.'
}

class ErrorMessage extends React.Component {
  static defaultProps = {
    type: 'GENERIC_ERROR'
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div className="error">
        <div className="error-emoji">{ERROR_EMOJIS[Math.floor(Math.random() * ERROR_EMOJIS.length)]}</div>
        <div className="error-text">{this.props.message || ERROR_MESSAGE[this.props.type]}</div>

        <style jsx>{`
          .error {
            text-align: center;
          }
          .error .error-emoji {
            padding-top: 96px;
            color: rgba(0, 0, 0, 0.4);
            font-size: 150px;
          }

          .error .error-text {
            color: rgba(0, 0, 0, 0.4);
            line-height: 20px;
            margin-top: 64px;
            white-space: pre-wrap;
            letter-spacing: 2px;
          }
        `}</style>
      </div>
    )
  }
}

export default ErrorMessage
