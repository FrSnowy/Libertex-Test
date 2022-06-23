import styled, { css } from 'styled-components';

export const SliderWrapper = styled.div`
  .rc-slider-handle {
    z-index: 1;
  }
  .rc-slider-dot {
    display: none;
  }
  .rc-slider-mark-text {
    &:nth-child(2) {
      left: 22% !important;
    }
    &:nth-child(3) {
      left: 50% !important;
    }
  }
  .rc-slider-handle {
    //Correct position for 1-10 values
    ${Array(10).fill(null).map((_, i) => css`
      &[aria-valuenow="${i + 1}"] {
        left: ${5.5 * i}% !important;
        &~.rc-slider-track {
          width: ${5.5 * i}% !important;
        }
      }
    `)}

    //Correct position for 11-40 values
    ${Array(30).fill(null).map((_, i) => css`
      &[aria-valuenow="${i + 11}"] {
        left: ${50 + 1.7 * i}% !important;
        &~.rc-slider-track {
          width: ${50 + 1.7 * i}% !important;
        }
      }
    `)}
  }

  ${p => css`
    .rc-slider-rail {
      background-color: ${p.theme.colors.controllers.slider.track};
    }
    .rc-slider-track {
      background-color: ${p.theme.colors.controllers.slider.control};
    }
    .rc-slider-mark, .rc-slider-mark-text-active {
      color: ${p.theme.colors.text.light};
    }
    .rc-slider-handle {
      width: 18px;
      height: 18px;
      background-color: ${p.theme.colors.text.contrast};
      border: ${p.theme.border(p.theme.colors.controllers.slider.control, 6)};
      margin-top: -7px;
      opacity: 1;
      &:active {
        box-shadow: none;
      }

      &.rc-slider-handle-dragging {
        border: ${p.theme.border(p.theme.colors.controllers.slider.control, 6)};
      }
    }

  `};
`;