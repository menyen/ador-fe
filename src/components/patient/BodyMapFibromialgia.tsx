import React from 'react';
import { BodyMapFibromialgiaProps } from '../../interfaces';

function BodyMapFibromialgia(props: BodyMapFibromialgiaProps) {
  const { preSelectedValues, markBodyParts, disabledBodyMapClick } = props;
  const [bodyMap, setBodyMap] = React.useState(
    preSelectedValues ?? new Array(19).fill(false)
  );
  const getAreaColor = (areaNumber: number) =>
    !!bodyMap[areaNumber - 1] ? '#329D63' : '#acacac';
  const handleClickArea = (bodyPartNumber: number) =>
    !disabledBodyMapClick &&
    setBodyMap((s) => {
      const newValues = [...s];
      newValues[bodyPartNumber - 1] = 1 - s[bodyPartNumber - 1];
      return newValues;
    });

  React.useEffect(
    () => markBodyParts && markBodyParts(bodyMap),
    [bodyMap, markBodyParts]
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="313.902"
      height="380.851"
      viewBox="0 0 313.902 380.851"
    >
      <g data-name="Grupo 1652" transform="translate(-31.089 -194)">
        <g data-name="Grupo 1651" transform="translate(6)">
          <ellipse
            cx="4.892"
            cy="26.148"
            fill={getAreaColor(5)}
            onClick={() => handleClickArea(5)}
            data-name="Elipse 344"
            opacity="0.35"
            rx="4.892"
            ry="26.148"
            transform="translate(55.218 310.499)"
          ></ellipse>
          <ellipse
            cx="4.892"
            cy="26.148"
            fill={getAreaColor(5)}
            onClick={() => handleClickArea(5)}
            data-name="Elipse 349"
            opacity="0.35"
            rx="4.892"
            ry="26.148"
            transform="translate(135.47 310.499)"
          ></ellipse>
          <ellipse
            cx="29.5"
            cy="23.5"
            fill={getAreaColor(4)}
            onClick={() => handleClickArea(4)}
            data-name="Elipse 350"
            opacity="0.35"
            rx="29.5"
            ry="23.5"
            transform="translate(70 295.948)"
          ></ellipse>
          <circle
            cx="6"
            cy="6"
            r="6"
            fill={getAreaColor(2)}
            onClick={() => handleClickArea(2)}
            data-name="Elipse 330"
            opacity="0.35"
            transform="translate(80 262.948)"
          ></circle>
          <path
            fill={getAreaColor(3)}
            onClick={() => handleClickArea(3)}
            d="M18.731 23.557c-3.793 3.987-15.143 6.133-19.819 8.427C-10.7 36.7-15.5 43.73-15.5 47.732c0 5.946 4.669-4.981 16.481-4.981s21.387-4.821 21.387-10.767v-4.318s1.301-4.109-3.637-4.109z"
            data-name="Caminho 2901"
            opacity="0.35"
            transform="translate(68.219 261.027)"
          ></path>
          <ellipse
            cx="7.071"
            cy="24.051"
            fill={getAreaColor(9)}
            onClick={() => handleClickArea(9)}
            data-name="Elipse 339"
            opacity="0.35"
            rx="7.071"
            ry="24.051"
            transform="rotate(-7 4090.145 -364.28)"
          ></ellipse>
          <ellipse
            cx="7.071"
            cy="24.051"
            fill={getAreaColor(9)}
            onClick={() => handleClickArea(9)}
            data-name="Elipse 337"
            opacity="0.35"
            rx="7.071"
            ry="24.051"
            transform="rotate(5.13 -5474.072 1473.66)"
          ></ellipse>
          <ellipse
            cx="9.5"
            cy="32"
            fill={getAreaColor(8)}
            onClick={() => handleClickArea(8)}
            data-name="Elipse 341"
            opacity="0.35"
            rx="9.5"
            ry="32"
            transform="translate(71 412.948)"
          ></ellipse>
          <ellipse
            cx="4.194"
            cy="19.076"
            fill={getAreaColor(7)}
            onClick={() => handleClickArea(7)}
            data-name="Elipse 346"
            opacity="0.35"
            rx="4.194"
            ry="19.076"
            transform="rotate(19 -1065.257 347.057)"
          ></ellipse>
          <ellipse
            cx="9.5"
            cy="32"
            fill={getAreaColor(8)}
            onClick={() => handleClickArea(8)}
            data-name="Elipse 335"
            opacity="0.35"
            rx="9.5"
            ry="32"
            transform="translate(109 412.948)"
          ></ellipse>
          <ellipse
            cx="29.5"
            cy="23"
            fill={getAreaColor(6)}
            onClick={() => handleClickArea(6)}
            data-name="Elipse 343"
            opacity="0.35"
            rx="29.5"
            ry="23"
            transform="translate(70 348.948)"
          ></ellipse>
          <path
            fill="none"
            stroke="#000"
            strokeWidth="1"
            d="M67.988 387.905s16.746 9.168 19.867 15.285 7.77 13.383 11.964 13.418 14.1-13.418 14.1-13.418l17.054-16.529"
            data-name="Caminho 2912"
          ></path>
          <ellipse
            cx="4.193"
            cy="19.076"
            fill={getAreaColor(7)}
            onClick={() => handleClickArea(7)}
            data-name="Elipse 348"
            opacity="0.35"
            rx="4.193"
            ry="19.076"
            transform="rotate(161 44.281 213.173)"
          ></ellipse>
          <ellipse
            cx="13.5"
            cy="11"
            fill={getAreaColor(1)}
            onClick={() => handleClickArea(1)}
            data-name="Elipse 328"
            opacity="0.35"
            rx="13.5"
            ry="11"
            transform="translate(86 268.948)"
          ></ellipse>
          <circle
            cx="6"
            cy="6"
            r="6"
            fill={getAreaColor(2)}
            onClick={() => handleClickArea(2)}
            data-name="Elipse 329"
            opacity="0.35"
            transform="translate(107 262.948)"
          ></circle>
          <path
            fill={getAreaColor(3)}
            onClick={() => handleClickArea(3)}
            d="M.692 24.731c4.477 2.63 11.857 5.025 16.533 7.32C26.834 36.767 32.8 41.158 32.8 45.16c0 5.946-4.8-1.33-16.611-1.33S-5.193 39.009-5.193 33.062c0-3.068-.642-2.14-.545-3.493.088-1.231.713-4.838 6.43-4.838z"
            data-name="Caminho 2899"
            opacity="0.35"
            transform="translate(112.39 259.949)"
          ></path>
          <path
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeWidth="1"
            d="M130.495 341.242c-1.6 1.512-3.229 36.505-.368 42.833s4.135 26.349 4.135 26.349a199.8 199.8 0 01-1.459 21.132c-1.389 11.553-4.336 25.719-5.709 37.491-1.355 11.617-1.154 20.918-.392 22.711 1.428 3.361-3.264 24.913-5.8 41.328a113.388 113.388 0 00-1.347 18.924 5.9 5.9 0 000 3.2c.462 2.007 5.532 4.745 8.021 7.714 1.048 1.25 3.972 3.933 2.068 6.149-2.605 3.032-3.546 4.7-8.743 4.976-2.506.135-8.942-1.987-9.771-6.606s-4.528-5.237-4.7-5.9a15.4 15.4 0 010-9.537c1.477-5.247-3.05-47.276-2.36-53.65s1.835-14.717 1.835-14.717l-6.5-67.388s-6.094 75.364-5.984 75.5-.071-.423 0 0c.428 2.532 2.745 3.213 2.464 11.867-3.661 18.211-1.4 47.5-1.4 47.5a45.3 45.3 0 00.55 5.694c.381 2.629.893 3.631.784 3.824-.109 1.595-1.6 1.2-4.529 4.46s-2.887 7.592-7.183 8.59-15.381-1.411-13.167-6.423 11.533-7.745 11.305-15.26c.923-11-6.958-29.556-8.91-42.838a132.689 132.689 0 01-1.4-16.283 147.161 147.161 0 000-23.611 291.646 291.646 0 01-5.867-35.4c-.965-10.31-1.322-19.834-1.557-22.663-.558-6.719 3.522-25.36 4.19-28.123s1.494-23.092 1.887-28.269-4.965-29.049-5.437-29.365 5.056 24.836 3.549 28.1c-.277.6.075 5.445-.825 10.284a94.651 94.651 0 01-3.661 13.139s-10 27.731-11.019 30.073a1.182 1.182 0 01-.151.278c.172 2.275-4.238 29.878-6.22 29.161s1.282-11.674 0-11.021-2.763 14.117-5.128 13.631 1.4-12.86 0-12.86-3.381 11.6-5.584 12.86 2.349-14.373.792-15.025-4.511 13.188-7.021 12.415 6.506-16.965 5.21-20.622-9.288 2.072-9.494-.837 15.607-11.233 15.607-11.233l3.753-18.59 1.921-20.295 3.4-13.565s2.593-22.266 3.019-25.935-5.824-12.541 3.892-24.613c7.458-9.266 15.829-8.333 20.438-11.131.019-.011 8.128-1.432 8.949-4.9 2.877-12.161.854-8.485.5-11.548a19.694 19.694 0 00-1.231-3.391 54.223 54.223 0 01-4.581-11.032c-.967-3.729.632-3.391.714-3.885.816-4.887-2.012-22.6 16.6-22.916 8.314-.141 13.6 3.615 15.932 8.3 2.686 5.4 1.718 11.9 1.694 12.7v.061s2.206 1.431 1.71 5.079-3.695 9.514-3.695 9.514l-3.174 7.51s-.2 7.32 1.031 9.307"
            data-name="Caminho 2911"
          ></path>
          <path
            fill="none"
            stroke="#000"
            strokeWidth="1"
            d="M111.821 284.145c5.574 5.4 22.579 10.357 27.192 13.495a15.653 15.653 0 015.253 6.8 28.811 28.811 0 011.778 7.233s-.3 33.927 1.524 38.965a51.6 51.6 0 013.659 10.9c1.557 15.871 6.031 42.061 6.031 42.061s14.464 8.26 16.243 11.013-5.611 1.578-9.128 0 5.978 17.184 4.831 20.9-5.914-12.6-7.4-11.553 3.6 15.7 1.447 15.729-4.492-14.006-5.989-14.006 1.8 13.073 0 14.006-3.633-13.341-4.844-14.006 3.364 15.422 0 11.345-7.334-24.114-6.391-29.121c.469-2.489-6.381-15.094-10.526-27.857a150.786 150.786 0 01-5.675-25.937s-.127-16.893 3.812-28.689"
            data-name="Caminho 2910"
          ></path>
        </g>
        <text
          fontFamily="Montserrat-SemiBold, Montserrat"
          fontSize="14"
          fontWeight="600"
          transform="translate(76 208)"
        >
          <tspan x="0" y="0">
            Frente
          </tspan>
        </text>
        <text
          fontFamily="Montserrat-SemiBold, Montserrat"
          fontSize="14"
          fontWeight="600"
          transform="translate(251 208)"
        >
          <tspan x="0" y="0">
            Costas
          </tspan>
        </text>
        <g data-name="Grupo 1650" transform="translate(-4)">
          <ellipse
            cx="4.892"
            cy="26.148"
            fill={getAreaColor(13)}
            onClick={() => handleClickArea(13)}
            data-name="Elipse 352"
            opacity="0.35"
            rx="4.892"
            ry="26.148"
            transform="translate(228.218 310.499)"
          ></ellipse>
          <ellipse
            cx="4.892"
            cy="26.148"
            fill={getAreaColor(13)}
            onClick={() => handleClickArea(13)}
            data-name="Elipse 351"
            opacity="0.35"
            rx="4.892"
            ry="26.148"
            transform="translate(308.47 310.499)"
          ></ellipse>
          <g data-name="Grupo 1648" transform="translate(-3466 -6288.763)">
            <ellipse
              cx="13.5"
              cy="11"
              fill={getAreaColor(10)}
              onClick={() => handleClickArea(10)}
              data-name="Elipse 327"
              opacity="0.35"
              rx="13.5"
              ry="11"
              transform="translate(3726 6561)"
            ></ellipse>
            <ellipse
              cx="29"
              cy="23.5"
              fill={getAreaColor(14)}
              onClick={() => handleClickArea(14)}
              data-name="Elipse 331"
              opacity="0.351"
              rx="29"
              ry="23.5"
              transform="translate(3710 6626)"
            ></ellipse>
            <ellipse
              cx="18"
              cy="19.5"
              fill={getAreaColor(15)}
              onClick={() => handleClickArea(15)}
              data-name="Elipse 332"
              opacity="0.351"
              rx="18"
              ry="19.5"
              transform="translate(3704 6676)"
            ></ellipse>
            <ellipse
              cx="17.5"
              cy="19.5"
              fill={getAreaColor(15)}
              onClick={() => handleClickArea(15)}
              data-name="Elipse 333"
              opacity="0.351"
              rx="17.5"
              ry="19.5"
              transform="translate(3739 6676)"
            ></ellipse>
            <ellipse
              cx="8.5"
              cy="29"
              fill={getAreaColor(17)}
              onClick={() => handleClickArea(17)}
              data-name="Elipse 334"
              opacity="0.35"
              rx="8.5"
              ry="29"
              transform="translate(3748 6719)"
            ></ellipse>
            <ellipse
              cx="7.157"
              cy="24.343"
              fill={getAreaColor(18)}
              onClick={() => handleClickArea(18)}
              data-name="Elipse 336"
              opacity="0.35"
              rx="7.157"
              ry="24.343"
              transform="rotate(5.13 -73829.978 45234.229)"
            ></ellipse>
            <ellipse
              cx="7.157"
              cy="24.343"
              fill={getAreaColor(18)}
              onClick={() => handleClickArea(18)}
              data-name="Elipse 338"
              opacity="0.35"
              rx="7.157"
              ry="24.343"
              transform="rotate(-7 57314.696 -26968.94)"
            ></ellipse>
            <ellipse
              cx="8.5"
              cy="29"
              fill={getAreaColor(17)}
              onClick={() => handleClickArea(17)}
              data-name="Elipse 340"
              opacity="0.35"
              rx="8.5"
              ry="29"
              transform="translate(3713 6719)"
            ></ellipse>
            <path
              fill={getAreaColor(11)}
              onClick={() => handleClickArea(11)}
              d="M-9.619 24.731c4.531 2.662 12 5.086 16.733 7.409 9.726 4.773 15.769 9.217 15.769 13.268 0 6.019-4.858-1.347-16.813-1.347s-21.646-4.879-21.646-10.9-5.998-8.43 5.957-8.43z"
              data-name="Caminho 2898"
              opacity="0.351"
              transform="translate(3762.768 6549.684)"
            ></path>
            <path
              fill={getAreaColor(11)}
              onClick={() => handleClickArea(11)}
              d="M18.631 36.138C14.1 38.8 3.82 41.3-.913 43.62-10.639 48.393-15.5 55.509-15.5 59.56c0 6.019 4.726-5.041 16.681-5.041s21.646-4.879 21.646-10.9 7.759-7.481-4.196-7.481z"
              data-name="Caminho 2900"
              opacity="0.351"
              transform="translate(3707.553 6539.227)"
            ></path>
            <path
              fill="none"
              stroke="#000"
              strokeWidth="1"
              d="M3708.065 6675.783s10.788-4.958 20.823-.367"
              data-name="Caminho 2902"
            ></path>
            <path
              fill="none"
              stroke="#000"
              strokeWidth="1"
              d="M3771.042 6676.791s-5.611-4.592-19.554-1.54"
              data-name="Caminho 2903"
            ></path>
            <path
              fill="none"
              stroke="#000"
              strokeWidth="1"
              d="M3739.533 6707.642s-17.706 13.407-35.593-6.557"
              data-name="Caminho 2904"
            ></path>
            <path
              fill="none"
              stroke="#000"
              strokeWidth="1"
              d="M3739.042 6707.651s17.611 13.4 35.5-6.565"
              data-name="Caminho 2905"
            ></path>
            <path
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeWidth="1"
              d="M3771.066 6626.622s-13.916-.319-22.049-8.465"
              data-name="Caminho 2906"
            ></path>
            <path
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeWidth="1"
              d="M3706.906 6626.622s13.916-.319 22.049-8.465"
              data-name="Caminho 2907"
            ></path>
            <path
              fill={getAreaColor(12)}
              onClick={() => handleClickArea(12)}
              d="M27 0a26.754 26.754 0 0127 26.5A26.754 26.754 0 0127 53 26.754 26.754 0 010 26.5 26.754 26.754 0 0127 0z"
              data-name="Caminho 2913"
              opacity="0.384"
              transform="translate(3712 6573)"
            ></path>
            <ellipse
              cx="4.244"
              cy="19.308"
              fill={getAreaColor(16)}
              onClick={() => handleClickArea(16)}
              data-name="Elipse 345"
              opacity="0.35"
              rx="4.244"
              ry="19.308"
              transform="rotate(19 -18056.84 14364.877)"
            ></ellipse>
            <ellipse
              cx="4.244"
              cy="19.308"
              fill={getAreaColor(16)}
              onClick={() => handleClickArea(16)}
              data-name="Elipse 347"
              opacity="0.35"
              rx="4.244"
              ry="19.308"
              transform="rotate(161 1338.813 3666.754)"
            ></ellipse>
            <path
              fill="none"
              stroke="#000"
              strokeWidth="1"
              d="M3751.789 6573.541c5.642 5.463 22.853 10.482 27.522 13.658a15.842 15.842 0 015.317 6.881 29.151 29.151 0 011.8 7.321s-.3 34.338 1.542 39.438a52.211 52.211 0 013.7 11.034c1.576 16.063 6.1 42.571 6.1 42.571s14.64 8.36 16.44 11.147-5.679 1.6-9.239 0 5.457 18.08 4.889 21.15-5.985-12.75-7.492-11.693 3.646 15.894 1.464 15.92-4.547-14.176-6.062-14.176 1.82 13.231 0 14.176-3.677-13.5-4.9-14.176 1.281 11.442 0 11.483-7.423-24.407-6.469-29.475c.475-2.519-6.459-15.277-10.654-28.2a152.619 152.619 0 01-5.743-26.251s-.129-17.1 3.858-29.038"
              data-name="Caminho 2908"
            ></path>
            <path
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeWidth="1"
              d="M3770.689 6631.33c-1.62 1.53-3.269 36.948-.373 43.353s4.185 26.669 4.185 26.669a202.222 202.222 0 01-1.477 21.388c-1.406 11.693-4.389 26.031-5.779 37.946-1.372 11.758-1.168 21.172-.4 22.986 1.445 3.4-3.3 25.215-5.874 41.829a114.773 114.773 0 00-1.363 19.154 5.973 5.973 0 000 3.243c.468 2.031 13.439 4.241 15.958 7.246s-5.881 4.774-5.881 4.774-17.837 3.613-20.9 3.144-3.131-1.06-3.551-2.651c-.159-.138-.492-10.6 1.089-15.755 1.494-5.311-3.087-47.85-2.389-54.3s1.857-14.9 1.857-14.9l-6.579-68.205s-6.167 76.278-6.057 76.419-.072-.428 0 0c.433 2.563 2.779 3.252 2.493 12.011-3.706 18.432-3.732 48.972-3.732 48.972s.146 2.183.7 6a78.355 78.355 0 01.54 9.262c-.11 1.614-3.146 3.144-6.725 3.144-6.278 0-18.388-3.144-18.388-3.144s-4.623-2.244-5.394-3.767 2.313-2.324 2.313-2.324l6.369-1.809s7.57-.652 7.34-8.258c.934-11.138-3.866-29.019-5.842-42.462a134.282 134.282 0 01-1.421-16.48 148.935 148.935 0 000-23.9 295.244 295.244 0 01-5.938-35.825c-.976-10.435-1.337-20.075-1.575-22.938-.564-6.8 3.564-25.668 4.241-28.464s1.511-23.372 1.91-28.612-5.025-29.4-5.5-29.721 5.117 25.137 3.592 28.44c-.281.607.076 5.511-.835 10.409a95.807 95.807 0 01-3.706 13.3s-10.117 28.067-11.153 30.438a1.2 1.2 0 01-.153.281c.174 2.3-4.29 30.24-6.3 29.514s1.3-11.815 0-11.155-2.8 14.288-5.19 13.8 1.413-13.016 0-13.016-3.422 11.744-5.651 13.016 2.377-14.547.8-15.208-4.565 13.348-7.106 12.566 6.585-17.171 5.273-20.873-9.4 2.1-9.609-.847 15.8-11.37 15.8-11.37l3.8-18.816 1.945-20.541 3.437-13.73s2.624-22.536 3.055-26.249-5.9-12.693 3.939-24.911c7.549-9.379 16.021-8.434 20.686-11.267.02-.011 8.227-1.449 9.057-4.96 2.912-12.309.864-8.588.509-11.688a19.922 19.922 0 00-1.246-3.432 54.894 54.894 0 01-4.637-11.166c-.979-3.775.64-3.432.723-3.932.826-4.947-2.036-22.873 16.8-23.194 8.415-.143 13.768 3.659 16.125 8.4 2.718 5.47 1.739 12.048 1.715 12.857v.062s2.233 1.448 1.73 5.141-3.74 9.629-3.74 9.629l-3.212 7.6s-.2 7.409 1.043 9.42"
              data-name="Caminho 2909"
            ></path>
          </g>
        </g>
      </g>
      <text
        data-name="1"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(75.735 89.841)"
        onClick={() => handleClickArea(1)}
      >
        <tspan x="-6.469" y="0">
          1
        </tspan>
      </text>
      <text
        data-name="10"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(244.735 92.841)"
        onClick={() => handleClickArea(10)}
      >
        <tspan x="-12.938" y="0">
          10
        </tspan>
      </text>
      <text
        data-name="12"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(244.735 123.841)"
        onClick={() => handleClickArea(12)}
      >
        <tspan x="-12.938" y="0">
          12
        </tspan>
      </text>
      <text
        data-name="13"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(203.735 145.841)"
        onClick={() => handleClickArea(13)}
      >
        <tspan x="-12.938" y="0">
          13
        </tspan>
      </text>
      <text
        data-name="16"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(194.735 201.841)"
        onClick={() => handleClickArea(16)}
      >
        <tspan x="-12.938" y="0">
          16
        </tspan>
      </text>
      <text
        data-name="13"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(284.735 145.841)"
        onClick={() => handleClickArea(13)}
      >
        <tspan x="-12.938" y="0">
          13
        </tspan>
      </text>
      <text
        data-name="16"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(292.735 201.841)"
        onClick={() => handleClickArea(16)}
      >
        <tspan x="-12.938" y="0">
          16
        </tspan>
      </text>
      <text
        data-name="14"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(244.735 169.841)"
        onClick={() => handleClickArea(14)}
      >
        <tspan x="-12.938" y="0">
          14
        </tspan>
      </text>
      <text
        data-name="15"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(226.735 217.841)"
        onClick={() => handleClickArea(15)}
      >
        <tspan x="-12.938" y="0">
          15
        </tspan>
      </text>
      <text
        data-name="15"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(261.735 217.841)"
        onClick={() => handleClickArea(15)}
      >
        <tspan x="-12.938" y="0">
          15
        </tspan>
      </text>
      <text
        data-name="17"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(261.735 268.841)"
        onClick={() => handleClickArea(17)}
      >
        <tspan x="-12.938" y="0">
          17
        </tspan>
      </text>
      <text
        data-name="17"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(226.735 270.841)"
        onClick={() => handleClickArea(17)}
      >
        <tspan x="-12.938" y="0">
          17
        </tspan>
      </text>
      <text
        data-name="18"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(227.735 327.841)"
        onClick={() => handleClickArea(18)}
      >
        <tspan x="-12.938" y="0">
          18
        </tspan>
      </text>
      <text
        data-name="18"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(258.735 327.841)"
        onClick={() => handleClickArea(18)}
      >
        <tspan x="-12.938" y="0">
          18
        </tspan>
      </text>
      <text
        data-name="11"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(215.735 108.841)"
        onClick={() => handleClickArea(11)}
      >
        <tspan x="-12.938" y="0">
          11
        </tspan>
      </text>
      <text
        data-name="11"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(269.735 108.841)"
        onClick={() => handleClickArea(11)}
      >
        <tspan x="-12.938" y="0">
          11
        </tspan>
      </text>
      <text
        data-name="2"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(67.735 72.841)"
        onClick={() => handleClickArea(2)}
      >
        <tspan x="-6.469" y="0">
          2
        </tspan>
      </text>
      <text
        data-name="3"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(53.735 106.841)"
        onClick={() => handleClickArea(3)}
      >
        <tspan x="-6.469" y="0">
          3
        </tspan>
      </text>
      <text
        data-name="4"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(77.735 129.841)"
        onClick={() => handleClickArea(4)}
      >
        <tspan x="-6.469" y="0">
          4
        </tspan>
      </text>
      <text
        data-name="5"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(38.735 145.841)"
        onClick={() => handleClickArea(5)}
      >
        <tspan x="-6.469" y="0">
          5
        </tspan>
      </text>
      <text
        data-name="7"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(31.735 195.841)"
        onClick={() => handleClickArea(7)}
      >
        <tspan x="-6.469" y="0">
          7
        </tspan>
      </text>
      <text
        data-name="5"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(118.735 145.841)"
        onClick={() => handleClickArea(5)}
      >
        <tspan x="-6.469" y="0">
          5
        </tspan>
      </text>
      <text
        data-name="7"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(122.735 193.841)"
        onClick={() => handleClickArea(7)}
      >
        <tspan x="-6.469" y="0">
          7
        </tspan>
      </text>
      <text
        data-name="6"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(77.735 181.841)"
        onClick={() => handleClickArea(6)}
      >
        <tspan x="-6.469" y="0">
          6
        </tspan>
      </text>
      <text
        data-name="8"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(58.735 253.841)"
        onClick={() => handleClickArea(8)}
      >
        <tspan x="-6.469" y="0">
          8
        </tspan>
      </text>
      <text
        data-name="9"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(63.735 330.841)"
        onClick={() => handleClickArea(9)}
      >
        <tspan x="-6.469" y="0">
          9
        </tspan>
      </text>
      <text
        data-name="8"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(96.735 253.841)"
        onClick={() => handleClickArea(8)}
      >
        <tspan x="-6.469" y="0">
          8
        </tspan>
      </text>
      <text
        data-name="9"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(93.735 330.841)"
        onClick={() => handleClickArea(9)}
      >
        <tspan x="-6.469" y="0">
          9
        </tspan>
      </text>
      <text
        data-name="3"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(103.735 106.841)"
        onClick={() => handleClickArea(3)}
      >
        <tspan x="-6.469" y="0">
          3
        </tspan>
      </text>
      <text
        data-name="2"
        fontFamily="SegoeUI, Segoe UI"
        fontSize="12"
        transform="translate(88.735 72.841)"
        onClick={() => handleClickArea(2)}
      >
        <tspan x="-6.469" y="0">
          2
        </tspan>
      </text>
    </svg>
  );
}

export default BodyMapFibromialgia;
