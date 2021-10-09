import React from 'react';
import { BodyMapBPIProps } from '../../interfaces';

const colorArray = ['#fff', '#44afab', '#f6f665', '#f66569'] as const;

function BodyMapBPI(props: BodyMapBPIProps) {
  const [bodyMap, setBodyMap] = React.useState(new Array(52).fill(0));
  const [isFrontSide, setIsBodyFrontSide] = React.useState(true);
  const handleClickArea = (bodyPartNumber: number) =>
    props.disabledBodyMapClick &&
    setBodyMap((s) => {
      const newValues = [...s];
      newValues[bodyPartNumber] =
        s[bodyPartNumber] < 3 ? s[bodyPartNumber] + 1 : 0;
      return newValues;
    });

  React.useEffect(() => props.markBodyPartsForBPI(bodyMap), [bodyMap]);

  const frontSide = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="316"
      height="472.908"
      viewBox="0 0 316 472.908"
    >
      <g data-name="Group 1692" transform="translate(72 31.453)">
        <path
          fill={colorArray[bodyMap[40]]}
          onClick={() => handleClickArea(40)}
          d="M12086.54-2267.378a56.079 56.079 0 008.553.808 41.1 41.1 0 007.78-.808s-1.6 2.948 1.784 8.1 9.788 6.472 11.623 11.428c1.772 4.783-6.757 9.636-6.757 9.636s-5.315 1.533-9.582 0-4.787-2.324-7.192-6.106-1.009-3.7-2.657-6.14-3.941-1.14-4.829-5.369 1.277-11.549 1.277-11.549z"
          data-name="Path 2846"
          transform="translate(-11981.302 2677.938)"
        ></path>
        <path
          fill={colorArray[bodyMap[39]]}
          onClick={() => handleClickArea(39)}
          d="M11689.194-2267.378l1.979 13.125a52.84 52.84 0 00-8.107 8.037c-3.83 4.771-1.581 7.869-7.716 8.411s-15.18-.808-16.616-6.1 9.128-9.978 12.913-15.3 2-8.167 2-8.167a45.1 45.1 0 007.885.822 41.1 41.1 0 007.662-.828z"
          data-name="Path 2845"
          transform="translate(-11600.015 2677.938)"
        ></path>
        <path
          fill={colorArray[bodyMap[37]]}
          onClick={() => handleClickArea(37)}
          d="M11681.138-2894.285a89.444 89.444 0 0015.552 1.192 87.644 87.644 0 0014.488-1.83s.511.277-1.537 15.584-.254 50.679-.254 50.679a34.324 34.324 0 01-7.815 1.242 31.392 31.392 0 01-7.644-.931 126.6 126.6 0 00-5.927-29.873c-1.079-4.951-3.03-9.927-3.837-14.082-3.198-16.483-3.026-21.981-3.026-21.981z"
          data-name="Path 2843"
          transform="translate(-11620.164 3239.024)"
        ></path>
        <path
          fill={colorArray[bodyMap[38]]}
          onClick={() => handleClickArea(38)}
          d="M11709.268-2893.633a93.812 93.812 0 01-14.2.731 80.285 80.285 0 01-14.08-1.807s-1.511.184.537 15.492 3 50.434 3 50.434 1.793 1.48 5.659 1.558 11.076-1.558 11.076-1.558-2.071-12.45 2.562-28.372c1.078-4.95 1.237-10.588 2.044-14.743 3.196-16.484 3.402-21.735 3.402-21.735z"
          data-name="Path 2844"
          transform="translate(-11579.305 3239.043)"
        ></path>
        <path
          fill={colorArray[bodyMap[36]]}
          onClick={() => handleClickArea(36)}
          d="M11721.121-3168.47a140.73 140.73 0 01-15.533 1.088 89.76 89.76 0 01-11.926-.7s.3 13.33-.554 19.055a73.143 73.143 0 00-.866 9.607l14.953 2.011 13.926-1.121s.029-15.424-.6-23.034.6-6.906.6-6.906z"
          data-name="Path 2842"
          transform="translate(-11590.38 3483.796)"
        ></path>
        <path
          fill={colorArray[bodyMap[35]]}
          onClick={() => handleClickArea(35)}
          d="M11678.045-3168.327a140.825 140.825 0 0015.535 1.087 86.431 86.431 0 0013.4-1.087s-2.328 13.4-1.474 19.123 4.632 10 2.014 10.263c-1.292.129-15.511 1.013-15.511 1.013l-13.962-1.346z"
          data-name="Path 2841"
          transform="translate(-11617.399 3483.654)"
        ></path>
        <path
          fill={colorArray[bodyMap[14]]}
          onClick={() => handleClickArea(14)}
          d="M11620.937-4137.5l5.532-77.794s-4.662-1.249-8.591-7.337c-2.5-3.063-4.121-8.338-7.036-11.745-7.814-9.134-12.174-9.083-14.773-12.439-6.944-4.482-10.074-5.48-10.074-5.48s-.321 1.6-1.571 8.564a120.637 120.637 0 00-2.74 19.946c.674 12.463 1.842 31.073 4.062 46.445 2.441 16.9 4.117 18.335 5.92 29.991s0 9.849 0 9.849l15.847 1.035z"
          data-name="Path 2839"
          transform="translate(-11531.242 4452.946)"
        ></path>
        <path
          fill={colorArray[bodyMap[15]]}
          onClick={() => handleClickArea(15)}
          d="M11582.567-4144.373l-6.762-77.627a19.174 19.174 0 009.212-7.773c2.5-3.063 4.122-8.337 7.036-11.745 7.813-9.135 12.175-9.083 14.772-12.439 6.946-4.482 8.645-6.327 8.645-6.327s1.753 2.446 3 9.41a161.36 161.36 0 011.906 20.484c-.672 12.462-2.355 30.287-4.577 45.659-2.441 16.9-2.768 18.585-4.571 30.24s-1.356 10.883-1.356 10.883h-14.49z"
          data-name="Path 2840"
          transform="translate(-11479.709 4459.56)"
        ></path>
        <path
          fill={colorArray[bodyMap[13]]}
          onClick={() => handleClickArea(13)}
          d="M11626.625-4268.85s22.643 1.8 42.6 1.879a212.816 212.816 0 0037.936-3.534s-12.607 12.072-21.911 21.411c-2.392 2.4-4.041 4.865-5.767 6.916-4.971 5.905-7.613 9.709-12.036 10.295-5.724.044-10.515-9.455-15.979-18.188s-24.843-18.779-24.843-18.779z"
          data-name="Path 2838"
          transform="translate(-11571.426 4469.324)"
        ></path>
        <path
          fill={colorArray[bodyMap[12]]}
          onClick={() => handleClickArea(12)}
          d="M12056.816-4373.909l2.268 10.539s-11.441 2.075-21.075 3a155.662 155.662 0 01-17.458.686l-.365-10.937 18.437-.825z"
          data-name="Path 2837"
          transform="translate(-11923.307 4561.819)"
        ></path>
        <path
          fill={colorArray[bodyMap[11]]}
          onClick={() => handleClickArea(11)}
          d="M11628.362-4369.52l39.878 2.751v11.25l-41.615-2.395z"
          data-name="Path 2836"
          transform="translate(-11571.426 4557.895)"
        ></path>
        <path
          fill={colorArray[bodyMap[10]]}
          onClick={() => handleClickArea(10)}
          d="M12021.262-4500.851v13.644a92.432 92.432 0 0017.563-.46c9-1.187 18.955-2.421 18.955-2.421l-.609-13.719-17.135 1.983z"
          data-name="Path 2835"
          transform="translate(-11924.27 4677.985)"
        ></path>
        <path
          fill={colorArray[bodyMap[9]]}
          onClick={() => handleClickArea(9)}
          d="M11643.907-4490l39.186 1.777v13.172h-10.413l-29.643-2.3z"
          data-name="Path 2834"
          transform="translate(-11586.1 4665.641)"
        ></path>
        <path
          fill={colorArray[bodyMap[6]]}
          onClick={() => handleClickArea(6)}
          d="M11695.4-4902.752a188.178 188.178 0 0014.351 25.137c9.568 14.359 21.254 16.834 21.254 16.834a273.662 273.662 0 01-34.89 3.246c-18.536.457-39.256-1.419-39.256-1.419s10.694-2.753 19.62-14.417 18.921-29.381 18.921-29.381z"
          data-name="Path 2833"
          transform="translate(-11598.459 5034.741)"
        ></path>
        <path
          fill={colorArray[bodyMap[5]]}
          onClick={() => handleClickArea(5)}
          d="M12058.852-4918.17s-3.561 7.436-16.512 25.375c-12.6 17.453-22.359 17.637-22.359 17.637l.727-18.78-2.355-16.836 13.719-9.56z"
          data-name="Path 2832"
          transform="translate(-11961.91 5050.359)"
        ></path>
        <path
          fill={colorArray[bodyMap[7]]}
          onClick={() => handleClickArea(7)}
          d="M12021.218-4918.472s2.079 7.738 15.031 25.676c12.6 17.453 20.563 16.281 20.563 16.281l3.121-34.293-13.417-9.526z"
          data-name="Path 2831"
          transform="translate(-11924.229 5050.466)"
        ></path>
        <path
          fill={colorArray[bodyMap[33]]}
          onClick={() => handleClickArea(33)}
          d="M15332.542-5599.569a47.963 47.963 0 00-11.645-3.123 40.21 40.21 0 00-10.93.346s-3.148 1.283-5.27 15.1c-.482 3.151-.611 7.625-1.338 12.568-2.445 16.673-6.4 37.965-6.4 37.965a31.518 31.518 0 006.859 3.364c3.654 1.2 8.486 2.21 8.486 2.21a331.426 331.426 0 0013.064-34.766c2.246-2.888 7.174-33.664 7.174-33.664z"
          data-name="Path 2828"
          transform="translate(-15275.749 5755.896)"
        ></path>
        <path
          fill={colorArray[bodyMap[49]]}
          onClick={() => handleClickArea(49)}
          d="M.144 42.2c-1.215-6.451 5.589-35.636 7.85-38.464 1.186-1.484.887 2.78.559 7.044-.3 3.861-.615 7.723.126 7.316 1.56-.857 3.923-19.242 6.239-18.04s-1.781 16.789.147 16.789S19.855.023 22.631.056s-3.382 17.992-1.465 19.337c.915.642 2.39-3.611 3.969-7.863 1.73-4.659 3.585-9.317 4.966-7.541 2.643 3.4-10.463 28.292-5.316 27.6s13.342-2.79 11.052.757C33.845 35.433 19.2 44.2 15.41 46.439l.06.064-.1-.039-.849.5z"
          data-name="Union 46"
          transform="rotate(180 18.116 133.532)"
        ></path>
        <path
          fill={colorArray[bodyMap[4]]}
          onClick={() => handleClickArea(4)}
          d="M15307.92-5915.6s-11.158-1.645-16.139-.335c-.84.222-.562 3.627-.562 3.627l-.748 13.11-1.916 17.649s6.338-2.3 12.066-1.576a37.562 37.562 0 0111.365 3.785s-.432-9.013-1.535-17.939-2.531-18.321-2.531-18.321z"
          data-name="Path 2825"
          transform="translate(-15255.782 6036.423)"
        ></path>
        <path
          fill={colorArray[bodyMap[1]]}
          onClick={() => handleClickArea(1)}
          d="M15084.125-6394.62s-32.84 12.762-33.1 12.889c-16.348 12.641-10.068 29.3-10.363 38.2 0 0 13.824-2.533 16.262.5s3.766 18.162 3.766 18.162 22.586-11.676 26.146-31.809-2.711-37.942-2.711-37.942z"
          data-name="Path 2824"
          transform="translate(-15004.95 6465.1)"
        ></path>
        <path
          fill={colorArray[bodyMap[3]]}
          onClick={() => handleClickArea(3)}
          d="M15051.745-6410.019s23.154 11.747 34.605 16.98 9.01 26.842 9.307 35.743c0 0-13.824-2.533-16.264.5s-3.764 18.163-3.764 18.163-22.586-11.676-26.146-31.809 2.262-39.577 2.262-39.577z"
          data-name="Path 2819"
          transform="translate(-14939.999 6478.237)"
        ></path>
        <path
          fill={colorArray[bodyMap[8]]}
          onClick={() => handleClickArea(8)}
          d="M15301.154-5915.6s11.16-1.645 16.139-.335c.84.222.563 3.627.563 3.627v13.014l1.8 16.493a40.361 40.361 0 00-11.2-.323 52.616 52.616 0 00-11.715 3.23 129.107 129.107 0 01.848-17.4 161.366 161.366 0 013.565-18.306z"
          data-name="Path 2820"
          transform="translate(-15162.077 6036.74)"
        ></path>
        <path
          fill={colorArray[bodyMap[50]]}
          onClick={() => handleClickArea(50)}
          d="M8.692 28.867c-.722-.4.008 3.591.638 7.578.73 4.624 1.325 9.248-.638 7.034C5.036 39.356-1.057 11.214.158 4.764L14.532 0s.307.179.849.5l.1-.039-.06.064c3.787 2.236 18.436 11.007 20.428 14.09 2.291 3.546-7.227 2.032-11.757 0s6.52 23.289 5.8 27.195c-.382 2.062-2.364-2.651-4.433-7.363-1.851-4.216-3.771-8.432-4.677-7.8-1.918 1.345 4.639 20.225 1.863 20.258s-5.785-18.04-7.714-18.04 2.316 16.837 0 18.04a.473.473 0 01-.22.056c-2.245.003-4.511-17.261-6.019-18.094z"
          data-name="Union 45"
          transform="translate(155.616 221.053)"
        ></path>
        <path
          fill={colorArray[bodyMap[34]]}
          onClick={() => handleClickArea(34)}
          d="M15296.713-5599.569a47.933 47.933 0 0111.643-3.123 40.221 40.221 0 0110.932.346s3.146 1.283 5.268 15.1c.484 3.151.611 7.625 1.338 12.568 2.443 16.673 6.43 39.406 6.43 39.406a19.129 19.129 0 01-6.506 3.983 19.525 19.525 0 01-7.885.544s-8.854-17.922-14.045-35.16c-2.249-2.888-7.175-33.664-7.175-33.664z"
          data-name="Path 2821"
          transform="translate(-15162.289 5756.213)"
        ></path>
        <path
          fill={colorArray[bodyMap[2]]}
          onClick={() => handleClickArea(2)}
          d="M15133.352-6171.781a54.109 54.109 0 0016.654 2.5c6.125-.181 12.379-3.185 15.787-3.285-1.607 2.308-4.967 19.734-2.807 35.1 2.006 15.753 13.391 26.756 13.391 26.756a192.537 192.537 0 01-26.957 2.3 161.532 161.532 0 01-25.566-2.244s10.807-12.006 13.182-27.286-3.684-33.841-3.684-33.841z"
          data-name="Path 2811"
          transform="translate(-15054.228 6239.548)"
        ></path>
        <g
          fill={colorArray[bodyMap[0]]}
          onClick={() => handleClickArea(0)}
          data-name="Group 1623"
          transform="translate(71.631)"
        >
          <path
            d="M2755.055 251.342c3.706-15.663 1.087-10.881.636-14.826a25.593 25.593 0 00-1.589-4.342 69.669 69.669 0 01-5.93-14.191c-1.246-4.8.846-4.447.953-5.083 1.051-6.295-2.574-29.033 21.392-29.441 10.709-.182 17.44 4.66 20.439 10.7 3.459 6.961 2.255 15.279 2.224 16.309v.106s2.863 1.867 2.223 6.566-4.766 12.179-4.766 12.179l-4.13 9.743s-.209 9.409 1.377 11.967"
            data-name="Path 2786"
            transform="translate(-2747.777 -183.453)"
          ></path>
          <path
            d="M11851.5-5507.076s13.576 7.788 32.937-.424"
            data-name="Path 2785"
            transform="translate(-11844.326 5574.965)"
          ></path>
        </g>
      </g>
      <g data-name="Group 1636" transform="translate(72 32)">
        <text
          data-name="1"
          fontFamily="Helvetica"
          fontSize="12"
          transform="translate(96.825 39.841)"
        >
          <tspan x="-6.674" y="0">
            1
          </tspan>
        </text>
        <g fill="none" stroke="#000" strokeWidth="1" data-name="Group 1626">
          <path
            d="M111.023 67.137c7.176 6.949 29.07 13.334 35.01 17.374a20.163 20.163 0 016.764 8.754 37.11 37.11 0 012.289 9.313s-.387 43.68 1.962 50.168a66.427 66.427 0 014.711 14.036c2 20.433 7.764 54.153 7.764 54.153s18.624 10.635 20.913 14.18-7.224 2.032-11.752 0 7.7 22.125 6.219 26.9-7.614-16.218-9.531-14.874 4.638 20.218 1.863 20.251-5.783-18.033-7.711-18.033 2.315 16.831 0 18.033-4.677-17.177-6.236-18.033 4.331 19.856 0 14.607-9.444-31.047-8.228-37.494c.6-3.2-8.216-19.434-13.553-35.866a194.146 194.146 0 01-7.309-33.393s-.163-21.75 4.907-36.938"
            data-name="Path 2769"
          ></path>
          <path
            strokeLinecap="round"
            d="M135.066 140.648c-2.06 1.947-4.158 47-.474 55.148s5.324 33.925 5.324 33.925a257.049 257.049 0 01-1.879 27.207c-1.787 14.874-5.582 33.113-7.351 48.27-1.745 14.957-1.485 26.932-.5 29.24 1.838 4.327-4.2 32.076-7.472 53.21a145.978 145.978 0 00-1.734 24.365 7.6 7.6 0 000 4.125c.6 2.584 7.123 6.109 10.328 9.932 1.349 1.609 5.115 5.064 2.662 7.917-3.355 3.9-4.566 6.047-11.256 6.407-3.227.174-11.513-2.558-12.58-8.505s-5.83-6.743-6.056-7.6c-.2-.176-2.011-5.722 0-12.279 1.9-6.756-3.926-60.868-3.039-69.075s2.362-18.949 2.362-18.949l-8.369-86.762s-7.845 97.031-7.7 97.21-.092-.545 0 0c.551 3.26 3.535 4.137 3.172 15.279-4.714 23.446-1.8 61.156-1.8 61.156a58.329 58.329 0 00.709 7.331c.491 3.385 1.149 4.674 1.009 4.923-.139 2.053-2.06 1.542-5.831 5.743s-3.717 9.774-9.248 11.06-19.8-1.816-16.952-8.27 14.848-9.972 14.555-19.648c1.189-14.168-8.957-38.054-11.471-55.154a170.789 170.789 0 01-1.808-20.964s1.287-11.834 0-30.4a375.575 375.575 0 01-7.554-45.572c-1.242-13.274-1.7-25.537-2-29.179-.719-8.65 4.533-32.652 5.394-36.208s1.923-29.731 2.429-36.4-6.391-37.4-7-37.808 6.509 31.977 4.57 36.177c-.356.772.1 7.01-1.063 13.241a121.779 121.779 0 01-4.714 16.917s-12.87 35.7-14.187 38.719a1.531 1.531 0 01-.194.358c.221 2.929-5.457 38.468-8.01 37.545s1.651-15.03 0-14.19-3.556 18.175-6.6 17.55 1.8-16.557 0-16.557-4.353 14.939-7.189 16.557 3.025-18.505 1.02-19.345-5.807 16.98-9.04 15.985 8.376-21.843 6.708-26.551S.279 239.396.013 235.652s20.095-14.463 20.095-14.463l4.833-23.935 2.473-26.13 4.372-17.465s3.339-28.667 3.887-33.391-7.5-16.146 5.011-31.689c9.6-11.93 20.38-10.729 26.313-14.332.025-.014 10.465-1.843 11.522-6.31 3.7-15.658 1.1-10.924.648-14.868a25.446 25.446 0 00-1.585-4.366 69.809 69.809 0 01-5.9-14.2c-1.245-4.8.814-4.366.919-5 1.051-6.292-2.59-29.1 21.367-29.5 10.705-.182 17.514 4.654 20.513 10.688 3.458 6.958 2.211 15.326 2.181 16.355v.079s2.84 1.842 2.2 6.539-4.757 12.249-4.757 12.249l-4.087 9.669s-.258 9.425 1.327 11.983"
            data-name="Path 2768"
          ></path>
          <path
            d="M20.217 219.145a26.616 26.616 0 014.479 1.894 37.709 37.709 0 0010.965 3.507"
            data-name="Path 2789"
          ></path>
          <path
            d="M31.341 154.789s2.773-2.116 8.693-2.25c3.781-.086 8.785-.292 15.447 4.5"
            data-name="Path 2788"
          ></path>
          <path
            strokeLinecap="round"
            d="M35.699 120.122s12.686-1.248 15.2.417"
            data-name="Path 2787"
          ></path>
          <path
            d="M78.397 68.265s19.184 49.543-23.256 70.694"
            data-name="Path 2744"
          ></path>
          <path
            d="M111.448 67.697s-18.361 50.205 24.074 71.355"
            data-name="Path 2745"
          ></path>
          <path
            d="M155.02 225.099s8.738 1.851 14.406-4.291"
            data-name="Path 2790"
          ></path>
          <path
            d="M134.43 156.298s13.5-5.328 22.738-2.6"
            data-name="Path 2791"
          ></path>
          <path
            d="M154.744 120.31s-12.027-1.6-16.043.317"
            data-name="Path 2792"
          ></path>
          <path
            d="M78.665 67.696s13.049 7.393 32.4-.815"
            data-name="Path 2770"
          ></path>
          <path
            d="M68.6 129.521a221.176 221.176 0 0026.986 1.984 207.49 207.49 0 0026.476-1.878"
            data-name="Path 2771"
          ></path>
          <path
            d="M57.247 175.176s25.856 1.394 39.401 1.517 35.591-2.986 35.591-2.986"
            data-name="Path 2774"
          ></path>
          <path
            d="M54.271 199.552s30.034 2.188 44.148 2.336c12.826.135 32.968-2.945 36.558-3.512l.517-.083"
            data-name="Path 2775"
          ></path>
          <path
            d="M56.212 187.897s28.306 2.621 42.415 2.77c12.825.135 34.913-3.175 34.913-3.175"
            data-name="Path 2776"
          ></path>
          <path
            d="M96.413 131.463s18.564 40.983 35.888 42.071"
            data-name="Path 2772"
          ></path>
          <path
            d="M96.146 131.427s-21.579 42.494-38.9 43.581"
            data-name="Path 2773"
          ></path>
          <path d="M96.413 176.697v25.234" data-name="Path 2777"></path>
          <path
            d="M54.271 200.093s21.559 11.8 25.578 19.68 10 17.231 15.4 17.274 18.151-17.274 18.151-17.274l21.956-21.283"
            data-name="Path 2778"
          ></path>
          <path
            d="M60.082 315.134s10.135.861 17.5.9a64.153 64.153 0 0011.532-.787"
            data-name="Path 2779"
          ></path>
          <path
            d="M60.082 344.564s10.135.86 17.5.9a48.956 48.956 0 0012.686-1.518"
            data-name="Path 2781"
          ></path>
          <path
            d="M102.359 315.122s9.358.873 16.727.91a54.352 54.352 0 0011.039-.8"
            data-name="Path 2780"
          ></path>
          <path
            d="M100.928 344.276a163.942 163.942 0 0018.156 1.608 54.327 54.327 0 0011.039-.8"
            data-name="Path 2782"
          ></path>
          <path
            d="M72.795 410.502s3.936 1.485 11.057.756a44.646 44.646 0 004.757-.756"
            data-name="Path 2783"
          ></path>
          <path
            d="M104.66 410.502s3.936 1.485 11.057.756a44.646 44.646 0 004.757-.756"
            data-name="Path 2784"
          ></path>
          <path
            d="M111.448 67.697s-18.361 50.205 24.074 71.355"
            data-name="Path 2794"
          ></path>
          <path
            d="M154.744 120.31s-12.027-1.6-16.043.317"
            data-name="Path 2812"
          ></path>
          <path
            d="M111.448 67.697s-18.361 50.205 24.074 71.355"
            data-name="Path 2813"
          ></path>
        </g>
        <text
          data-name="3"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(97.825 106.841)"
          onClick={() => handleClickArea(2)}
        >
          <tspan x="-6.118" y="0">
            3
          </tspan>
        </text>
        <text
          data-name="2"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(62.825 101.841)"
          onClick={() => handleClickArea(1)}
        >
          <tspan x="-6.118" y="0">
            2
          </tspan>
        </text>
        <text
          data-name="5"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(47.825 141.841)"
          onClick={() => handleClickArea(4)}
        >
          <tspan x="-6.118" y="0">
            5
          </tspan>
        </text>
        <text
          data-name="34"
          fontFamily="Helvetica"
          fontSize="12"
          transform="translate(43.825 188.841)"
          onClick={() => handleClickArea(33)}
        >
          <tspan x="-13.348" y="0">
            34
          </tspan>
        </text>
        <text
          data-name="50"
          fontFamily="Helvetica"
          fontSize="12"
          transform="translate(29.825 238.841)"
          onClick={() => handleClickArea(49)}
        >
          <tspan x="-13.348" y="0">
            50
          </tspan>
        </text>
        <text
          data-name="51"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(171.825 238.841)"
          onClick={() => handleClickArea(50)}
        >
          <tspan x="-12.235" y="0">
            51
          </tspan>
        </text>
        <text
          data-name="35"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(159.825 188.841)"
          onClick={() => handleClickArea(34)}
        >
          <tspan x="-12.235" y="0">
            35
          </tspan>
        </text>
        <text
          data-name="6"
          fontFamily="Helvetica"
          fontSize="10"
          transform="translate(74.825 147.841)"
          onClick={() => handleClickArea(5)}
        >
          <tspan x="-5.562" y="0">
            6
          </tspan>
        </text>
        <text
          data-name="10"
          fontFamily="Helvetica"
          fontSize="12"
          transform="translate(82.825 185.841)"
          onClick={() => handleClickArea(9)}
        >
          <tspan x="-13.348" y="0">
            10
          </tspan>
        </text>
        <text
          data-name="12"
          fontFamily="Helvetica"
          fontSize="10"
          transform="translate(82.825 198.841)"
          onClick={() => handleClickArea(11)}
        >
          <tspan x="-11.123" y="0">
            12
          </tspan>
        </text>
        <text
          data-name="13"
          fontFamily="Helvetica"
          fontSize="10"
          transform="translate(121.825 198.841)"
          onClick={() => handleClickArea(12)}
        >
          <tspan x="-11.123" y="0">
            13
          </tspan>
        </text>
        <text
          data-name="11"
          fontFamily="Helvetica"
          fontSize="12"
          transform="translate(118.825 185.841)"
          onClick={() => handleClickArea(10)}
        >
          <tspan x="-12.463" y="0">
            11
          </tspan>
        </text>
        <text
          data-name="7"
          fontFamily="Helvetica"
          fontSize="12"
          transform="translate(97.825 163.841)"
          onClick={() => handleClickArea(6)}
        >
          <tspan x="-6.674" y="0">
            7
          </tspan>
        </text>
        <text
          data-name="14"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(100.825 223.841)"
          onClick={() => handleClickArea(13)}
        >
          <tspan x="-12.235" y="0">
            14
          </tspan>
        </text>
        <text
          data-name="15"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(76.825 269.841)"
          onClick={() => handleClickArea(14)}
        >
          <tspan x="-12.235" y="0">
            15
          </tspan>
        </text>
        <text
          data-name="36"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(72.825 334.841)"
          onClick={() => handleClickArea(35)}
        >
          <tspan x="-6.118" y="0">
            36
          </tspan>
        </text>
        <text
          data-name="38"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(76.825 380.841)"
          onClick={() => handleClickArea(37)}
        >
          <tspan x="-6.118" y="0">
            38
          </tspan>
        </text>
        <text
          data-name="40"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(72.825 430.841)"
          onClick={() => handleClickArea(39)}
        >
          <tspan x="-6.118" y="0">
            40
          </tspan>
        </text>
        <text
          data-name="16"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(123.825 269.841)"
          onClick={() => handleClickArea(15)}
        >
          <tspan x="-12.235" y="0">
            16
          </tspan>
        </text>
        <text
          data-name="37"
          fontFamily="Helvetica"
          fontSize="12"
          transform="translate(116.825 334.841)"
          onClick={() => handleClickArea(36)}
        >
          <tspan x="-6.674" y="0">
            37
          </tspan>
        </text>
        <text
          data-name="39"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(114.825 380.841)"
          onClick={() => handleClickArea(38)}
        >
          <tspan x="-6.118" y="0">
            39
          </tspan>
        </text>
        <text
          data-name="41"
          fontFamily="Helvetica"
          fontSize="12"
          transform="translate(118.825 430.841)"
          onClick={() => handleClickArea(40)}
        >
          <tspan x="-6.674" y="0">
            41
          </tspan>
        </text>
        <text
          data-name="8"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(121.825 148.841)"
          onClick={() => handleClickArea(7)}
        >
          <tspan x="-6.118" y="0">
            8
          </tspan>
        </text>
        <text
          data-name="9"
          fontFamily="Helvetica"
          fontSize="10"
          transform="translate(149.825 140.841)"
          onClick={() => handleClickArea(8)}
        >
          <tspan x="-5.562" y="0">
            9
          </tspan>
        </text>
        <text
          data-name="4"
          fontFamily="Helvetica"
          fontSize="11"
          transform="translate(130.825 101.841)"
          onClick={() => handleClickArea(3)}
        >
          <tspan x="-6.118" y="0">
            4
          </tspan>
        </text>
      </g>
      <text
        fontFamily="Montserrat-SemiBold, Montserrat"
        fontSize="14"
        fontWeight="600"
        transform="translate(144 14)"
      >
        <tspan x="0" y="0">
          Frente
        </tspan>
      </text>
      <g
        data-name="Group 1628"
        fontFamily="Montserrat-Medium, Montserrat"
        fontSize="10"
        fontWeight="500"
        transform="translate(-25 -213)"
      >
        <text transform="translate(237 283)">
          <tspan x="0" y="0">
            Esquerdo
          </tspan>
        </text>
        <text transform="translate(99 283)">
          <tspan x="0" y="0">
            Direito
          </tspan>
        </text>
      </g>
      <g data-name="Group 1006" transform="translate(0 141.816)">
        <rect
          width="18"
          height="18"
          fill="#44afab"
          data-name="Rectangle 1922"
          rx="4"
          transform="translate(0 .184)"
        ></rect>
      </g>
      <g data-name="Group 1629" transform="translate(0 90)">
        <rect
          width="18"
          height="18"
          fill="#f66569"
          data-name="Rectangle 1922"
          rx="4"
        ></rect>
      </g>
      <g data-name="Group 1630" transform="translate(0 115.908)">
        <rect
          width="18"
          height="18"
          fill="#f6f665"
          data-name="Rectangle 1922"
          rx="4"
          transform="translate(0 .092)"
        ></rect>
      </g>
      <text
        fill="#f66569"
        data-name="Dor forte"
        fontFamily="Montserrat-Medium, Montserrat"
        fontSize="10"
        fontWeight="500"
        transform="translate(24 102)"
      >
        <tspan x="0" y="0">
          Dor forte
        </tspan>
      </text>
      <text
        data-name="Dor moderada"
        fontFamily="Montserrat-Medium, Montserrat"
        fontSize="10"
        fontWeight="500"
        transform="translate(24 128)"
      >
        <tspan x="0" y="0">
          Dor moderada
        </tspan>
      </text>
      <text
        data-name="Dor leve"
        fontFamily="Montserrat-Medium, Montserrat"
        fontSize="10"
        fontWeight="500"
        transform="translate(24 154)"
      >
        <tspan x="0" y="0">
          Dor leve
        </tspan>
      </text>
      <g
        onClick={() => setIsBodyFrontSide(false)}
        data-name="Group 1631"
        transform="translate(-17 205)"
      >
        <text
          fontFamily="Montserrat-Medium, Montserrat"
          fontSize="12"
          fontWeight="500"
          transform="translate(292 264)"
        >
          <tspan x="0" y="0">
            Costas
          </tspan>
        </text>
        <g transform="translate(296 208.275)">
          <path
            d="M31.084 26.057a.511.511 0 00-.51.51c0 3.327-6.768 6.136-14.778 6.137S1.017 29.893 1.017 26.567c0-1.536 1.521-3.08 4.171-4.232a27.23 27.23 0 0110.429-1.9L13.8 22.25a.51.51 0 00.722.72l3.05-3.047-3.05-3.05a.509.509 0 00-.72.72l1.823 1.823A28.321 28.321 0 004.784 21.4C1.7 22.742 0 24.578 0 26.568c0 4.014 6.94 7.156 15.8 7.156s15.8-3.146 15.8-7.158a.514.514 0 00-.516-.509z"
            data-name="Path 2878"
          ></path>
        </g>
      </g>
    </svg>
  );

  const backSide = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="316"
      height="472.908"
      viewBox="0 0 316 472.908"
    >
      <text
        fontFamily="Montserrat-SemiBold, Montserrat"
        fontSize="14"
        fontWeight="600"
        transform="translate(144 14)"
      >
        <tspan x="0" y="0">
          Costas
        </tspan>
      </text>
      <g
        data-name="Group 1628"
        fontFamily="Montserrat-Medium, Montserrat"
        fontSize="10"
        fontWeight="500"
        transform="translate(-20 -213)"
      >
        <text transform="translate(277 283)">
          <tspan x="-34.25" y="0">
            Direito
          </tspan>
        </text>
        <text transform="translate(99 283)">
          <tspan x="0" y="0">
            Esquerdo
          </tspan>
        </text>
      </g>
      <g
        onClick={() => setIsBodyFrontSide(true)}
        data-name="Group 1631"
        transform="translate(-272 200)"
      >
        <text
          fontFamily="Montserrat-Medium, Montserrat"
          fontSize="12"
          fontWeight="500"
          transform="translate(292 264)"
        >
          <tspan x="0" y="0">
            Frente
          </tspan>
        </text>
        <g transform="translate(296 208.275)">
          <path
            d="M31.084 26.057a.511.511 0 00-.51.51c0 3.327-6.768 6.136-14.778 6.137S1.017 29.893 1.017 26.567c0-1.536 1.521-3.08 4.171-4.232a27.23 27.23 0 0110.429-1.9L13.8 22.25a.51.51 0 00.722.72l3.05-3.047-3.05-3.05a.509.509 0 00-.72.72l1.823 1.823A28.321 28.321 0 004.784 21.4C1.7 22.742 0 24.578 0 26.568c0 4.014 6.94 7.156 15.8 7.156s15.8-3.146 15.8-7.158a.514.514 0 00-.516-.509z"
            data-name="Path 2878"
          ></path>
        </g>
      </g>
      <g data-name="body-map" transform="translate(70 30) scale(1.275)">
        <g data-name="Group 1678" transform="translate(-18451.397 6146.608)">
          <path
            fill={colorArray[bodyMap[47]]}
            onClick={() => handleClickArea(47)}
            d="M13561.381-2258.169s2.667 13.574 1.429 15.682c-.431.731-2.5 2.178-5.6 2.377-5.814.373-14.606-1.409-19.22-3.014s-6.785-3.027-5.321-5.268 10.292-2.034 12.464-3.9c3.087-1.009 3.577-6.513 3.577-6.513a21.726 21.726 0 006.47 1.587 17.885 17.885 0 006.201-.951z"
            data-name="Path 2868"
            transform="translate(4957.509 -3565.728)"
          ></path>
          <path
            fill={colorArray[bodyMap[48]]}
            onClick={() => handleClickArea(48)}
            d="M14046.137-2251.2h13.082a5.821 5.821 0 00.535 3.405c.844 1.274 5.26 1.966 5.693 2.255 4.027 2.689 10.938 2.821 10.141 5.571s-7.451 4.464-13.322 5.431c-4.086.674-8.219 1.551-11.494 1.623a12.067 12.067 0 01-5.416-1.012c-1.631-.921.781-17.273.781-17.273z"
            data-name="Path 2867"
            transform="translate(4487.477 -3572.7)"
          ></path>
          <path
            fill={colorArray[bodyMap[45]]}
            onClick={() => handleClickArea(45)}
            d="M13640.169-2989.8a72.152 72.152 0 0111.059-1.722 62.426 62.426 0 0110.619.348 31.217 31.217 0 012.125 5.428c1.379 4.195-.529 12.53-.529 12.53a165.146 165.146 0 00-2.172 18.365c-.713 10.784-.674 24.771-.674 24.771a10.58 10.58 0 01-5.613.976 35.066 35.066 0 01-7.363-1.858 132.578 132.578 0 00-2.916-24.4c-1-4.933-1.541-9.567-2.7-15.543l-1.334-9.235z"
            data-name="Path 2865"
            transform="translate(4858.516 -2893.73)"
          ></path>
          <path
            fill={colorArray[bodyMap[46]]}
            onClick={() => handleClickArea(46)}
            d="M13670.25-2990.114a85.944 85.944 0 00-10.787-1.463 77.673 77.673 0 00-11.346.3s.506 1-.873 5.192.639 13.91.639 13.91l1.145 17.383c.711 10.783.783 24.654.783 24.654a12.157 12.157 0 005.895.976c3.256-.312 7.23-.976 7.23-.976a108.8 108.8 0 012.346-25.281c1-4.934 1.615-9.834 2.773-15.81l1.553-9.074z"
            data-name="Path 2866"
            transform="translate(4883.841 -2893.676)"
          ></path>
          <path
            fill={colorArray[bodyMap[43]]}
            onClick={() => handleClickArea(43)}
            d="M13642.276-3254.41a14.579 14.579 0 009.219 3.076c5.789 0 13.941-3.076 13.941-3.076l-1.674 21.882a126.122 126.122 0 00-13.367 0 25.6 25.6 0 00-8.119 1.721z"
            data-name="Path 2863"
            transform="translate(4856.583 -2652.605)"
          ></path>
          <path
            fill={colorArray[bodyMap[44]]}
            onClick={() => handleClickArea(44)}
            d="M13642.276-3254.41a14.579 14.579 0 009.219 3.076 64.047 64.047 0 0013.141-1.889l-1.09 13.92.848 8.822s-6.77-2.018-12.141-1.588-9.686.368-9.686.368l.775-7.6z"
            data-name="Path 2864"
            transform="translate(4889.615 -2653.268)"
          ></path>
          <path
            fill={colorArray[bodyMap[31]]}
            onClick={() => handleClickArea(31)}
            d="M13584.384-3975.873s-3.832 54.086-4.1 54.153c-.132.034-7.81 3.172-13.565 3.07a16.08 16.08 0 01-9.56-3.443s-3.315-13.632-5.289-28.636-2.3-31.346-2.3-31.346 9.284 8.8 18.063 10.361 16.751-4.159 16.751-4.159z"
            data-name="Path 2861"
            transform="translate(4941.597 -1985.268)"
          ></path>
          <path
            fill={colorArray[bodyMap[32]]}
            onClick={() => handleClickArea(32)}
            d="M13548.963-3975.539s4.955 53.252 5.22 53.319c.133.034 6.832 3.509 12.587 3.407a22.83 22.83 0 009.9-2.451s2.877-14.461 4.852-29.464 2.3-31.346 2.3-31.346-9.284 8.8-18.063 10.361-16.796-3.826-16.796-3.826z"
            data-name="Path 2862"
            transform="translate(4977.425 -1985.268)"
          ></path>
          <path
            fill={colorArray[bodyMap[29]]}
            onClick={() => handleClickArea(29)}
            d="M13842.288-4347.538a16.452 16.452 0 005.246-.878 24.731 24.731 0 005.3-2.879 20.788 20.788 0 005.342 2.879 41.328 41.328 0 007.283 1.678v-44.629a44.093 44.093 0 01-11.523 1.8 45.593 45.593 0 01-11.645-1.8z"
            data-name="Path 2860"
            transform="translate(4673.171 -1609.853)"
          ></path>
          <path
            fill={colorArray[bodyMap[28]]}
            onClick={() => handleClickArea(28)}
            d="M13553.967-4316.747a30.771 30.771 0 0110.2-2.257 29.389 29.389 0 0110.092 1.9l.316 36.406a26.082 26.082 0 01-6.029 0 29 29 0 01-7.779-2.1c-6.15-2.613-10.789-8.351-10.789-8.351a102.353 102.353 0 011.152-11.159c.999-6.401 2.837-14.439 2.837-14.439z"
            data-name="Path 2857"
            transform="translate(4941.223 -1676.214)"
          ></path>
          <path
            fill={colorArray[bodyMap[30]]}
            onClick={() => handleClickArea(30)}
            d="M13586.678-4310.941a27.728 27.728 0 00-10.268-2.606 33.951 33.951 0 00-8.922.978v37.341s1.15-.088 4.576-.469c2.4-.268 5.953-1.693 8.5-2.775a24.655 24.655 0 009.729-7.884 91.432 91.432 0 00-1.107-10.535c-1-6.4-2.508-14.05-2.508-14.05z"
            data-name="Path 2858"
            transform="translate(4971.226 -1681.299)"
          ></path>
          <path
            fill={colorArray[bodyMap[23]]}
            onClick={() => handleClickArea(23)}
            d="M13867.783-5004.026a52.393 52.393 0 01-11.234 1.371 62.582 62.582 0 01-11.865-1.371v-45.8a24.288 24.288 0 006.723-4.048 19.993 19.993 0 004.16-5.952 29.273 29.273 0 005.471 6.681 22.589 22.589 0 006.746 3.77z"
            data-name="Path 2856"
            transform="translate(4670.975 -996.769)"
          ></path>
          <path
            fill={colorArray[bodyMap[26]]}
            onClick={() => handleClickArea(26)}
            d="M13601.787-4643a53.745 53.745 0 009.461-2.133 59.471 59.471 0 009.117-4.111v29.321a28.116 28.116 0 00-10.189-1.908 27.219 27.219 0 00-9.895 2.726z"
            data-name="Path 2854"
            transform="translate(4895.093 -1373.327)"
          ></path>
          <path
            fill={colorArray[bodyMap[27]]}
            onClick={() => handleClickArea(27)}
            d="M13621.9-4640.663s-3.68-1.125-8.325-2.686a40.072 40.072 0 01-8.649-4.3v29.048a54.283 54.283 0 019.8-.594 20.85 20.85 0 019.373 3.066l-1.937-8.042z"
            data-name="Path 2855"
            transform="translate(4933.912 -1375.288)"
          ></path>
          <path
            fill={colorArray[bodyMap[22]]}
            onClick={() => handleClickArea(22)}
            d="M13621.78-4925.128v22.529a52.862 52.862 0 01-9 4.6 49.477 49.477 0 01-9.614 2.4s.693-1.449.439-7-2.023-15.328-2.023-15.328a72.749 72.749 0 0011.2-2.765 45.979 45.979 0 008.998-4.436z"
            data-name="Path 2852"
            transform="translate(4893.904 -1120.295)"
          ></path>
          <path
            fill={colorArray[bodyMap[24]]}
            onClick={() => handleClickArea(24)}
            d="M13610.513-4912.015v21.441a34.524 34.524 0 008.263 4.6 39.1 39.1 0 008.508 2.176s.413-1.225.667-6.777a143.437 143.437 0 011.814-14.342s-5.939-1.95-10.989-3.751-8.263-3.347-8.263-3.347z"
            data-name="Path 2853"
            transform="translate(4928.369 -1132.487)"
          ></path>
          <path
            fill={colorArray[bodyMap[18]]}
            onClick={() => handleClickArea(18)}
            d="M13410.581-5412.238h18.824l.026 40.444a69.072 69.072 0 01-9.567 4.618 79.077 79.077 0 01-10.633 3.061l-3.729-14.468a12.1 12.1 0 00-4.31-.711 65.2 65.2 0 00-7.215.446 22.512 22.512 0 01-2.142-9.914c.229-5.227.482-6.165 3.061-11s3.358-5.286 7.258-8.327a25.176 25.176 0 018.427-4.149z"
            data-name="Path 2850"
            transform="translate(5086.254 -673.544)"
          ></path>
          <path
            fill={colorArray[bodyMap[20]]}
            onClick={() => handleClickArea(20)}
            d="M13421.965-5412.238h-15.128l-.182 40.842a41.841 41.841 0 008.337 4.22 79.034 79.034 0 0010.633 3.061l3.259-14.732a30.472 30.472 0 014.78-.446 65.17 65.17 0 017.214.446 44.958 44.958 0 00.522-9.238c-.23-5.227.693-6.791-1.887-11.622s-2.642-4.753-6.541-7.794-11.007-4.737-11.007-4.737z"
            data-name="Path 2851"
            transform="translate(5132.155 -673.461)"
          ></path>
          <path
            fill={colorArray[bodyMap[19]]}
            onClick={() => handleClickArea(19)}
            d="M13845.085-5412.238h23.18v41.182a38.429 38.429 0 01-7.926-5.466 19.2 19.2 0 01-4.312-6.475 20.615 20.615 0 01-4.863 7.021 43.674 43.674 0 01-6.078 4.454z"
            data-name="Path 2849"
            transform="translate(4670.606 -673.541)"
          ></path>
          <path
            fill={colorArray[bodyMap[17]]}
            onClick={() => handleClickArea(17)}
            d="M13646.685-5593.067a38.286 38.286 0 0011.559 2.234 41.267 41.267 0 0011.879-1.984s-.74 5.716 2.318 7.944 13.66 6.728 13.66 6.728l-56.2-.117 6.714-2.446s5.468-.516 7.985-3.605 2.085-8.754 2.085-8.754z"
            data-name="Path 2848"
            transform="translate(4867.931 -507.602)"
          ></path>
          <path
            fill={colorArray[bodyMap[16]]}
            onClick={() => handleClickArea(16)}
            d="M13757.3-6100.62a34.1 34.1 0 0010.945 2.181 44.032 44.032 0 0012-1.81v-2.788s1.8-4.062 3.785-8.382c1.186-2.577 2.721-5.053 3.2-7.353 1.279-6.134-1.676-6.473-1.676-6.473s4.637-20.046-16.121-21.315-18.277 22.938-18.277 22.938-2.09-.1-.678 4.851 6.326 14.952 6.326 14.952z"
            data-name="Path 2847"
            transform="translate(4757.81)"
          ></path>
          <path
            fill={colorArray[bodyMap[41]]}
            onClick={() => handleClickArea(41)}
            d="M15324.844-5600.292a37.582 37.582 0 00-9.125-2.446 31.513 31.513 0 00-8.564.271s-2.469 1.005-4.129 11.836c-.379 2.47-.48 5.976-1.049 9.85-1.916 13.066-5.02 29.752-5.02 29.752a24.681 24.681 0 005.375 2.636c2.865.939 6.65 1.732 6.65 1.732a259.644 259.644 0 0010.238-27.244c1.764-2.269 5.624-26.387 5.624-26.387z"
            data-name="Path 2870"
            transform="translate(3170.729 -423.957)"
          ></path>
          <path
            fill={colorArray[bodyMap[51]]}
            onClick={() => handleClickArea(51)}
            d="M.113 33.069c-.952-5.054 4.38-27.925 6.151-30.141.929-1.163.695 2.179.438 5.52-.232 3.026-.482 6.052.1 5.733C8.023 13.51 9.875-.9 11.69.044s-1.4 13.157.115 13.157S15.56.018 17.735.044s-2.651 14.1-1.148 15.154c.717.5 1.873-2.83 3.11-6.162 1.356-3.651 2.809-7.3 3.892-5.91 2.071 2.662-8.2 22.171-4.166 21.632s10.456-2.186 8.661.593c-1.561 2.416-13.04 9.29-16.008 11.042l.047.05-.08-.031-.665.391z"
            data-name="Union 47"
            transform="rotate(180 9239.896 -2968.69)"
          ></path>
          <path
            fill={colorArray[bodyMap[21]]}
            onClick={() => handleClickArea(21)}
            d="M15303.732-5915.786s-8.748-1.289-12.648-.263c-.658.174-.439 2.843-.439 2.843l-.588 10.273-1.5 13.831a23.6 23.6 0 019.457-1.234 29.463 29.463 0 018.906 2.966s-.338-7.063-1.2-14.059-1.988-14.357-1.988-14.357z"
            data-name="Path 2869"
            transform="translate(3188.443 -136.376)"
          ></path>
          <path
            fill={colorArray[bodyMap[25]]}
            onClick={() => handleClickArea(25)}
            d="M15300.193-5915.786s8.746-1.289 12.646-.263c.658.174.441 2.843.441 2.843v10.2l1.412 12.925a31.631 31.631 0 00-8.779-.253 41.23 41.23 0 00-9.182 2.531 101.071 101.071 0 01.664-13.64 126.47 126.47 0 012.798-14.343z"
            data-name="Path 2873"
            transform="translate(3260.528 -136.375)"
          ></path>
          <path
            fill={colorArray[bodyMap[52]]}
            onClick={() => handleClickArea(52)}
            d="M6.812 22.622c-.566-.311.006 2.814.5 5.938.572 3.624 1.039 7.247-.5 5.513C3.947 30.842-.829 8.788.124 3.734L11.388 0s.241.14.665.391l.08-.031-.047.05c2.968 1.752 14.447 8.626 16.008 11.042 1.8 2.779-5.663 1.593-9.214 0s5.11 18.25 4.543 21.312c-.3 1.616-1.852-2.077-3.474-5.77-1.451-3.3-2.956-6.608-3.665-6.11-1.5 1.054 3.635 15.85 1.46 15.876S13.212 22.622 11.7 22.622s1.815 13.195 0 14.137a.371.371 0 01-.172.044C9.769 36.8 8 23.272 6.812 22.622z"
            data-name="Union 48"
            transform="translate(18573.1 -5973.935)"
          ></path>
          <path
            fill={colorArray[bodyMap[42]]}
            onClick={() => handleClickArea(42)}
            d="M15296.713-5600.292a37.584 37.584 0 019.123-2.446 31.531 31.531 0 018.566.271s2.467 1.005 4.129 11.836c.379 2.47.48 5.976 1.047 9.85 1.918 13.066 5.041 30.881 5.041 30.881a15 15 0 01-5.1 3.121 15.291 15.291 0 01-6.178.427 208.031 208.031 0 01-11.006-27.553c-1.763-2.269-5.622-26.387-5.622-26.387z"
            data-name="Path 2874"
            transform="translate(3260.527 -423.792)"
          ></path>
          <path
            fill="none"
            d="M13844.684-4389.549a41.788 41.788 0 0011.086 1.663 55.3 55.3 0 0012.1-1.663"
            data-name="Path 2859"
            transform="translate(4670.975 -1611.485)"
          ></path>
        </g>
        <g data-name="Group 1643" transform="translate(-112.397 -255.392)">
          <g
            fill="none"
            stroke="#000"
            strokeWidth="1"
            data-name="Group 1627"
            transform="translate(113 256)"
          >
            <path
              d="M87.461 52.948c5.573 5.4 22.572 10.353 27.183 13.49a15.656 15.656 0 015.252 6.8 28.81 28.81 0 011.777 7.231s-.3 33.915 1.523 38.952a51.575 51.575 0 013.657 10.9c1.556 15.865 6.029 42.047 6.029 42.047s14.46 8.257 16.238 11.01-5.609 1.578-9.125 0 5.39 17.858 4.829 20.89-5.912-12.593-7.4-11.549 3.6 15.7 1.446 15.724-4.49-14-5.988-14 1.8 13.068 0 14-3.631-13.337-4.842-14 1.265 11.3 0 11.342-7.332-24.106-6.389-29.112c.469-2.488-6.38-15.089-10.523-27.848a150.718 150.718 0 01-5.673-25.928s-.127-16.887 3.81-28.68"
              data-name="Path 2639"
            ></path>
            <path
              strokeLinecap="round"
              d="M106.069 110.134c-1.618 1.524-3.265 36.8-.372 43.183s4.181 26.565 4.181 26.565a200.648 200.648 0 01-1.475 21.3c-1.4 11.647-4.384 25.929-5.773 37.8-1.37 11.712-1.166 21.089-.4 22.9 1.443 3.388-3.3 25.116-5.868 41.665A114.027 114.027 0 0095 322.626a5.939 5.939 0 000 3.23c.468 2.023 13.426 4.224 15.942 7.217s-5.875 4.755-5.875 4.755-17.819 3.6-20.881 3.132-3.127-1.056-3.547-2.64c-.158-.138-.491-10.559 1.087-15.694 1.493-5.29-3.083-47.662-2.386-54.088s1.855-14.838 1.855-14.838l-6.573-67.938s-6.161 75.979-6.05 76.119-.073-.427 0 0c.432 2.553 2.775 3.239 2.491 11.964-3.7 18.359-3.728 48.78-3.728 48.78s.146 2.175.7 5.977a77.947 77.947 0 01.539 9.225c-.11 1.608-3.144 3.132-6.718 3.132-6.272 0-18.369-3.132-18.369-3.132s-4.619-2.235-5.388-3.752 2.31-2.315 2.31-2.315l6.363-1.8s7.563-.649 7.333-8.226c.933-11.094-3.862-28.9-5.836-42.3a133.311 133.311 0 01-1.42-16.416 147.949 147.949 0 000-23.8 293.22 293.22 0 01-5.932-35.685c-.975-10.394-1.336-20-1.573-22.848-.564-6.774 3.561-25.567 4.236-28.353s1.51-23.281 1.907-28.5-5.019-29.286-5.5-29.6 5.112 25.039 3.589 28.328c-.28.6.076 5.489-.834 10.368a95.172 95.172 0 01-3.7 13.247s-10.107 27.957-11.141 30.318a1.208 1.208 0 01-.153.28c.174 2.294-4.285 30.122-6.29 29.4s1.3-11.769 0-11.111-2.793 14.232-5.185 13.743 1.412-12.965 0-12.965-3.418 11.7-5.646 12.965 2.376-14.49.8-15.148-4.561 13.3-7.1 12.517 6.578-17.1 5.268-20.791-9.391 2.089-9.6-.843 15.78-11.325 15.78-11.325l3.8-18.742 1.942-20.46 3.433-13.676s2.622-22.447 3.052-26.146-5.889-12.643 3.935-24.814c7.541-9.342 16-8.4 20.664-11.222.02-.011 8.219-1.443 9.048-4.941 2.909-12.261.863-8.554.509-11.642a19.831 19.831 0 00-1.245-3.419 54.585 54.585 0 01-4.632-11.122c-.978-3.76.639-3.419.722-3.917.825-4.927-2.034-22.784 16.78-23.1 8.407-.143 13.754 3.645 16.109 8.369 2.716 5.449 1.737 12 1.713 12.807v.062s2.231 1.442 1.729 5.12-3.736 9.591-3.736 9.591l-3.209 7.571s-.2 7.38 1.042 9.383"
              data-name="Path 2640"
            ></path>
            <path
              d="M24.654 121.201s2.151-1.643 6.749-1.748a17.248 17.248 0 0111.994 3.495"
              data-name="Path 2742"
            ></path>
            <path
              strokeLinecap="round"
              d="M28.058 94.058s9.85-.969 11.8.323"
              data-name="Path 2743"
            ></path>
            <path
              d="M62.737 45.364h0a34.315 34.315 0 0012.951 2c3.022-.115 8.025-.6 10.4-2"
              data-name="Path 2746"
            ></path>
            <path d="M45.115 60.228h57.283" data-name="Path 2747"></path>
            <path d="M63.713 61.049v127.323" data-name="Path 2748"></path>
            <path d="M86.841 61.049v127.323" data-name="Path 2749"></path>
            <path
              strokeLinecap="round"
              d="M43.533 108.7s25.99-5.562 30.965-18.611"
              data-name="Path 2751"
            ></path>
            <path
              strokeLinecap="round"
              d="M105.679 108.747s-25.843-5.5-30.889-18.5c0-.013-.015-.039-.025-.065"
              data-name="Path 2752"
            ></path>
            <path
              d="M43.193 153.739s10.655-4.9 20.566-.363"
              data-name="Path 2753"
            ></path>
            <path
              d="M105.811 154.744s-5.543-4.535-19.314-1.521"
              data-name="Path 2754"
            ></path>
            <path
              d="M45.177 130.562s13.366-2.518 18.459-7.036"
              data-name="Path 2755"
            ></path>
            <path
              d="M103.9 130.394s-11.955-2.678-17.053-7.2"
              data-name="Path 2756"
            ></path>
            <path
              d="M74.282 185.478s-17.488 13.242-35.154-6.476"
              data-name="Path 2757"
            ></path>
            <path
              d="M74.183 185.486s17.393 13.233 35.061-6.484"
              data-name="Path 2758"
            ></path>
            <path
              d="M46.729 239.258s6.009 6.988 23.322.166"
              data-name="Path 2759"
            ></path>
            <path
              d="M102.258 239.653s-4.929 6.593-22.242-.229"
              data-name="Path 2760"
            ></path>
            <path
              d="M46.722 263.164s6.293-2.634 21.456-1.522"
              data-name="Path 2761"
            ></path>
            <path
              d="M102.142 263.089s-6.882-2.559-22.044-1.448"
              data-name="Path 2762"
            ></path>
            <path
              d="M53.954 322.048s6.884 3.132 12.884 1.065"
              data-name="Path 2763"
            ></path>
            <path
              d="M81.36 322.931s6.743 2.417 13.339 0"
              data-name="Path 2764"
            ></path>
            <path
              d="M121.705 176.249s6.786 1.437 11.186-3.332"
              data-name="Path 2765"
            ></path>
            <path
              d="M105.469 122.373s10.481-4.137 17.655-2.02"
              data-name="Path 2766"
            ></path>
            <path
              d="M121.232 94.205s-9.338-1.24-12.457.247"
              data-name="Path 2767"
            ></path>
            <path
              d="M15.369 171.701a20.68 20.68 0 013.478 1.471 29.278 29.278 0 008.513 2.723"
              data-name="Path 2877"
            ></path>
          </g>
          <text
            data-name="17"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(188 287)"
            onClick={() => handleClickArea(16)}
          >
            <tspan x="-5.005" y="0">
              17
            </tspan>
          </text>
          <text
            data-name="18"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(188 313)"
            onClick={() => handleClickArea(17)}
          >
            <tspan x="-5.005" y="0">
              18
            </tspan>
          </text>
          <text
            data-name="19"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(161 339)"
            onClick={() => handleClickArea(18)}
          >
            <tspan x="-5.005" y="0">
              19
            </tspan>
          </text>
          <text
            data-name="22"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(147 367)"
            onClick={() => handleClickArea(21)}
          >
            <tspan x="-5.005" y="0">
              22
            </tspan>
          </text>
          <text
            data-name="42"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(142 402)"
            onClick={() => handleClickArea(41)}
          >
            <tspan x="-5.005" y="0">
              42
            </tspan>
          </text>
          <text
            data-name="27"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(167 398)"
            onClick={() => handleClickArea(26)}
          >
            <tspan x="-5.005" y="0">
              27
            </tspan>
          </text>
          <text
            data-name="29"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(165 428)"
            onClick={() => handleClickArea(28)}
          >
            <tspan x="-5.005" y="0">
              29
            </tspan>
          </text>
          <text
            data-name="32"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(169 473)"
            onClick={() => handleClickArea(31)}
          >
            <tspan x="-5.005" y="0">
              32
            </tspan>
          </text>
          <text
            data-name="44"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(172 511)"
            onClick={() => handleClickArea(43)}
          >
            <tspan x="-5.005" y="0">
              44
            </tspan>
          </text>
          <text
            data-name="46"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(172 543)"
            onClick={() => handleClickArea(45)}
          >
            <tspan x="-5.005" y="0">
              46
            </tspan>
          </text>
          <text
            data-name="48"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(170 592)"
            onClick={() => handleClickArea(47)}
          >
            <tspan x="-5.005" y="0">
              48
            </tspan>
          </text>
          <text
            data-name="49"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(203 592)"
            onClick={() => handleClickArea(48)}
          >
            <tspan x="-5.005" y="0">
              49
            </tspan>
          </text>
          <text
            data-name="47"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(203 543)"
            onClick={() => handleClickArea(46)}
          >
            <tspan x="-5.005" y="0">
              47
            </tspan>
          </text>
          <text
            data-name="33"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(206 473)"
            onClick={() => handleClickArea(32)}
          >
            <tspan x="-5.005" y="0">
              33
            </tspan>
          </text>
          <text
            data-name="45"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(204 511)"
            onClick={() => handleClickArea(44)}
          >
            <tspan x="-5.005" y="0">
              45
            </tspan>
          </text>
          <text
            data-name="31"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(211 428)"
            onClick={() => handleClickArea(30)}
          >
            <tspan x="-5.005" y="0">
              31
            </tspan>
          </text>
          <text
            data-name="53"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(245 443)"
            onClick={() => handleClickArea(52)}
          >
            <tspan x="-5.005" y="0">
              53
            </tspan>
          </text>
          <text
            data-name="52"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(131 443)"
            onClick={() => handleClickArea(51)}
          >
            <tspan x="-5.005" y="0">
              52
            </tspan>
          </text>
          <text
            data-name="30"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(188 422)"
            onClick={() => handleClickArea(29)}
          >
            <tspan x="-5.005" y="0">
              30
            </tspan>
          </text>
          <text
            data-name="28"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(209 401)"
            onClick={() => handleClickArea(27)}
          >
            <tspan x="-5.005" y="0">
              28
            </tspan>
          </text>
          <text
            data-name="43"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(232 398)"
            onClick={() => handleClickArea(42)}
          >
            <tspan x="-5.005" y="0">
              43
            </tspan>
          </text>
          <text
            data-name="23"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(167 376)"
            onClick={() => handleClickArea(22)}
          >
            <tspan x="-5.005" y="0">
              23
            </tspan>
          </text>
          <text
            data-name="24"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(188 374)"
            onClick={() => handleClickArea(23)}
          >
            <tspan x="-5.005" y="0">
              24
            </tspan>
          </text>
          <text
            data-name="25"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(209 376)"
            onClick={() => handleClickArea(24)}
          >
            <tspan x="-5.005" y="0">
              25
            </tspan>
          </text>
          <text
            data-name="26"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(227 368)"
            onClick={() => handleClickArea(25)}
          >
            <tspan x="-5.005" y="0">
              26
            </tspan>
          </text>
          <text
            data-name="20"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(188 335)"
            onClick={() => handleClickArea(19)}
          >
            <tspan x="-5.005" y="0">
              20
            </tspan>
          </text>
          <text
            data-name="21"
            fontFamily="Helvetica"
            fontSize="9"
            transform="translate(215 339)"
            onClick={() => handleClickArea(20)}
          >
            <tspan x="-5.005" y="0">
              21
            </tspan>
          </text>
          <path
            fill="none"
            stroke="#000"
            strokeWidth="1"
            d="M176.658 401.78a46.509 46.509 0 0011.921 2.009A44.154 44.154 0 00199.921 402"
            data-name="Path 2879"
          ></path>
        </g>
      </g>
      <g data-name="Group 1006" transform="translate(0 141.816)">
        <rect
          width="18"
          height="18"
          fill="#44afab"
          data-name="Rectangle 1922"
          rx="4"
          transform="translate(0 .184)"
        ></rect>
      </g>
      <g data-name="Group 1629" transform="translate(0 90)">
        <rect
          width="18"
          height="18"
          fill="#f66569"
          data-name="Rectangle 1922"
          rx="4"
        ></rect>
      </g>
      <g data-name="Group 1630" transform="translate(0 115.908)">
        <rect
          width="18"
          height="18"
          fill="#f6f665"
          data-name="Rectangle 1922"
          rx="4"
          transform="translate(0 .092)"
        ></rect>
      </g>
      <text
        data-name="Dor forte"
        fontFamily="Montserrat-Medium, Montserrat"
        fontSize="10"
        fontWeight="500"
        transform="translate(24 102)"
      >
        <tspan x="0" y="0">
          Dor forte
        </tspan>
      </text>
      <text
        data-name="Dor moderada"
        fontFamily="Montserrat-Medium, Montserrat"
        fontSize="10"
        fontWeight="500"
        transform="translate(24 128)"
      >
        <tspan x="0" y="0">
          Dor moderada
        </tspan>
      </text>
      <text
        data-name="Dor leve"
        fontFamily="Montserrat-Medium, Montserrat"
        fontSize="10"
        fontWeight="500"
        transform="translate(24 154)"
      >
        <tspan x="0" y="0">
          Dor leve
        </tspan>
      </text>
    </svg>
  );
  return isFrontSide ? frontSide : backSide;
}

export default BodyMapBPI;
