import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  siAuth0,
  siClaude,
  siCloudflare,
  siDocker,
  siExpress,
  siFigma,
  siFramer,
  siGithubactions,
  siGithubcopilot,
  siGooglecloud,
  siGooglegemini,
  siGsap,
  siKimi,
  siKnexdotjs,
  siMongodb,
  siNodedotjs,
  siPostgresql,
  siReact,
  siRedis,
  siSentry,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
} from "simple-icons";
import {
  type ElementConnectorGeometry,
  useElementConnector,
} from "../hooks/useElementConnector";

interface TechnologiesProps {
  isDark: boolean;
}

/* Structural subset of simple-icons' SimpleIcon — also lets us inline marks
   the library dropped on vendor request (AWS, Azure). */
interface TechIcon {
  title: string;
  slug: string;
  hex: string;
  path: string;
}

const AWS_ICON: TechIcon = {
  title: "AWS",
  slug: "amazonaws",
  hex: "232F3E",
  path: "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z",
};

const AZURE_ICON: TechIcon = {
  title: "Microsoft Azure",
  slug: "microsoftazure",
  hex: "0078D4",
  path: "M22.379 23.343a1.62 1.62 0 0 0 1.536-2.14v.002L17.35 1.76A1.62 1.62 0 0 0 15.816.657H8.184A1.62 1.62 0 0 0 6.65 1.76L.086 21.204a1.62 1.62 0 0 0 1.536 2.139h4.741a1.62 1.62 0 0 0 1.535-1.103l.977-2.892 4.947 3.675c.28.208.618.32.966.32m-3.084-12.531 3.624 10.739a.54.54 0 0 1-.51.713v-.001h-.03a.54.54 0 0 1-.322-.106l-9.287-6.9h4.853m6.313 7.006c.116-.326.13-.694.007-1.058L9.79 1.76a1.722 1.722 0 0 0-.007-.02h6.034a.54.54 0 0 1 .512.366l6.562 19.445a.54.54 0 0 1-.338.684",
};

const OPENAI_ICON: TechIcon = {
  title: "OpenAI",
  slug: "openai",
  hex: "412991",
  path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
};

const MSSQL_ICON: TechIcon = {
  title: "Microsoft SQL Server",
  slug: "microsoftsqlserver",
  hex: "CC2927",
  path: "M4.724 2.505s-.08.127-.004.315c.046.116.186.256.34.404 0 0 1.615 1.576 1.813 1.804.895 1.033 1.284 2.05 1.32 3.453.022.9-.151 1.692-.573 2.613-.756 1.649-2.35 3.468-4.81 5.49l.36-.12c.233-.173.548-.359 1.292-.766 1.713-.936 3.636-1.798 5.999-2.686 3.399-1.277 8.99-2.776 12.172-3.263l.331-.051-.05-.08c-.292-.452-.49-.731-.73-1.027-.697-.863-1.542-1.567-2.577-2.146-1.422-.797-3.267-1.416-5.6-1.88a67.93 67.93 0 00-2.191-.375 209.29 209.29 0 01-3.924-.64c-.425-.075-1.06-.181-1.481-.272a9.404 9.404 0 01-.961-.258c-.268-.105-.645-.207-.726-.515zm.936.909c.003-.002.063.017.137.042.136.046.316.1.526.159.146.04.307.084.479.127.218.056.399.104.401.107.024.027.391 1.198.516 1.647.048.172.084.315.081.318a.789.789 0 01-.09-.14c-.424-.746-1.097-1.505-1.874-2.116a3.104 3.104 0 01-.176-.144zm1.79.494c.018-.001.099.012.195.034.619.136 1.725.35 2.435.47.119.02.216.04.216.047a.348.348 0 01-.098.062c-.119.06-.602.349-.763.457-.403.27-.766.559-1.03.821a5.4 5.4 0 01-.197.192c-.003 0-.022-.062-.041-.137a12.09 12.09 0 00-.65-1.779 1.801 1.801 0 01-.071-.165c0-.001 0-.002.004-.002zm3.147.598c.02.007.06.13.129.404a6.05 6.05 0 01.153 1.977l-.012.038-.187-.06c-.388-.124-1.02-.31-1.562-.46a6.625 6.625 0 01-.56-.17c0-.022.449-.471.642-.642.369-.326 1.362-1.098 1.397-1.087zm.25.036c.011-.01 1.504.248 2.182.378.506.097 1.237.25 1.281.269.022.008-.054.05-.297.16-.96.432-1.672.82-2.38 1.293-.186.124-.341.226-.344.226-.004 0-.006-.104-.006-.23 0-.69-.139-1.387-.391-1.976a.688.688 0 01-.045-.12zm3.86.764c.011.011-.038.306-.08.48-.132.54-.482 1.344-.914 2.099a2.26 2.26 0 01-.152.246 1.499 1.499 0 01-.219-.115c-.422-.247-.9-.48-1.425-.697a4.588 4.588 0 01-.278-.12c-.024-.022 1.143-.795 1.762-1.166.495-.297 1.292-.741 1.306-.727zm.276.043c.033 0 .695.18 1.037.283.853.255 1.837.614 2.475.904l.265.12-.187.043c-1.561.36-2.9.773-4.188 1.296-.107.044-.2.08-.207.08a.911.911 0 01.075-.185c.388-.823.638-1.687.703-2.42.006-.067.018-.121.027-.121zm-6.58 1.512c.01-.01.514.108.789.185.413.116 1.292.41 1.292.433 0 .004-.097.089-.215.188-.475.397-.934.813-1.483 1.343a5.27 5.27 0 01-.308.285c-.007 0-.01-.023-.006-.05.083-.611.065-1.395-.05-2.193a1.29 1.29 0 01-.02-.19zm10.61.01c.007.008-.234.385-.384.6-.22.314-.537.726-1.261 1.637l-.954 1.202a9.418 9.418 0 01-.269.333c-.003 0-.05-.066-.103-.146a7.584 7.584 0 00-1.47-1.625 9.59 9.59 0 00-.27-.218.427.427 0 01-.074-.063c0-.01.617-.274 1.088-.466a37.02 37.02 0 012.778-.99c.442-.135.912-.27.919-.264zm.278.073a.93.93 0 01.207.1 12.274 12.274 0 012.428 1.824c.194.19.667.683.66.687l-.363.029c-1.53.115-3.486.44-5.37.893-.128.03-.238.056-.246.056-.007 0 .133-.14.311-.312 1.107-1.063 1.611-1.734 2.205-2.934.088-.178.163-.333.166-.342h.002zm-8.088.83c.051.01.523.23.879.408.325.163.818.426.843.449.003.003-.17.093-.386.201-.683.342-1.268.664-1.878 1.037-.175.107-.32.194-.325.194-.015 0-.01-.013.088-.191a7.702 7.702 0 00.738-2.002c.014-.062.03-.1.041-.097zm-.475.084c.01.01-.112.46-.19.7a9.092 9.092 0 01-.835 1.808l-.09.147-.203-.197a2.671 2.671 0 00-.676-.5 1.009 1.009 0 01-.176-.102c0-.03.62-.593 1.098-.998.343-.29 1.064-.867 1.072-.858zm2.888 1.188l.177.115c.407.264.888.619 1.255.924.206.172.605.53.687.616l.044.047-.294.082a53.8 53.8 0 00-4.45 1.424c-.167.061-.31.112-.32.112-.021 0-.042.019.333-.326.96-.883 1.807-1.856 2.44-2.802zm-.759.19c.009.009-.492.71-.789 1.106-.356.473-.99 1.265-1.426 1.78a8.769 8.769 0 01-.346.397c-.01.003-.015-.05-.016-.133 0-.44-.112-.91-.308-1.308-.083-.168-.097-.208-.08-.224.068-.062 1.127-.666 1.794-1.023.459-.246 1.163-.604 1.171-.595zm-4.59 1.125a3.988 3.988 0 01.812.518c.008.005-.087.083-.21.172-.345.249-.87.644-1.173.886-.32.255-.331.263-.295.207.24-.367.36-.574.486-.84.113-.236.224-.516.304-.76a.675.675 0 01.077-.183zm1.223.96c.017-.003.04.028.139.175.207.31.366.722.407 1.058l.008.073-.497.192c-.89.346-1.711.687-2.266.94-.155.072-.428.202-.607.292-.179.09-.325.16-.325.156 0-.004.112-.089.25-.188 1.087-.79 2.025-1.654 2.732-2.519.075-.092.144-.172.153-.178a.016.016 0 01.006-.002zm-.564.14c.015.014-.401.484-.681.77-.7.715-1.396 1.275-2.256 1.821-.108.069-.206.13-.22.138-.023.014.008-.022.386-.434.238-.259.42-.474.628-.743.136-.177.162-.202.362-.346.537-.388 1.767-1.221 1.781-1.207zM9.925 0c-.08-.01-1.371.455-2.2.791-1.123.457-1.996.894-2.534 1.272-.2.14-.452.393-.488.49a.356.356 0 00-.021.123l.488.46 1.158.37L9.087 4l3.153.542.032-.27-.028-.005-.415-.066-.085-.148a27.702 27.702 0 01-1.177-2.325 12.264 12.264 0 01-.53-1.465C9.969.02 9.962.005 9.925 0zm-.061.186h.005c.003.003.017.105.032.225.062.508.176 1 .354 1.53.134.4.136.377-.024.332-.37-.103-2.032-.388-3.234-.555a8.796 8.796 0 01-.357-.053c-.015-.015.867-.477 1.258-.66.501-.232 1.867-.8 1.966-.819zM6.362 1.814l.141.048c.772.262 2.706.632 3.775.72.12.01.222.021.225.024.003.003-.1.058-.228.122-.515.258-1.083.573-1.476.819-.115.072-.22.13-.235.129a4.868 4.868 0 01-.17-.027l-.144-.023-.365-.355c-.641-.62-1.141-1.1-1.335-1.28zm-.143.114l.511.638c.282.35.564.699.626.774.063.075.111.138.108.14-.014.011-.74-.13-1.125-.219a8.532 8.532 0 01-.803-.212l-.2-.064.001-.049c.003-.245.312-.607.836-.976zm4.352.869c.015.001.032.032.077.131.124.272.51 1.008.603 1.15.03.047.08.05-.433-.033-1.23-.198-1.629-.265-1.629-.273a.36.36 0 01.083-.054 7.13 7.13 0 001.107-.767l.175-.147c.006-.005.012-.008.017-.007zm4.309 8.408l-4.808 1.568-4.18 1.846-1.17.31c-.298.282-.613.568-.948.86-.37.321-.716.612-.98.822a7.46 7.46 0 00-.953.945c-.332.414-.592.854-.704 1.193-.2.61-.103 1.228.285 1.798.495.728 1.48 1.468 2.625 1.972.585.256 1.57.588 2.31.774 1.233.312 3.614.65 4.926.7.266.01.62.01.637-.002.028-.019.233-.405.47-.89.806-1.646 1.389-3.19 1.703-4.508.19-.799.338-1.863.434-3.125.027-.354.037-1.533.016-1.934a13.564 13.564 0 00-.183-1.706.435.435 0 01-.012-.15c.014-.01.059-.025.65-.197zm-1.1.645c.045 0 .16 1.114.191 1.82.006.151.005.247-.004.247-.028 0-.615-.345-1.032-.606a28.716 28.716 0 01-1.162-.772c-.035-.028-.031-.029.266-.131.505-.174 1.704-.558 1.742-.558zm-2.448.803c.03 0 .115.047.315.172.75.47 1.766 1.035 2.2 1.225.136.06.151.036-.16.247-.662.45-1.486.892-2.497 1.342a7.59 7.59 0 01-.331.142.989.989 0 01.043-.2c.245-.905.383-1.82.387-2.554.002-.362.002-.364.037-.373h.006zm-.504.193c.021.022.006.834-.02 1.056a9.206 9.206 0 01-.418 1.837c-.014.017-.511-.468-.676-.66a4.918 4.918 0 01-.669-.973c-.082-.162-.214-.484-.202-.493.056-.04 1.971-.78 1.985-.767zm-2.375.936c.004 0 .008.001.01.004a.881.881 0 01.056.131c.116.315.376.782.602 1.08a6.247 6.247 0 001.017 1.06c.023.02.03.016-.562.24a48.53 48.53 0 01-2.294.8c-.327.106-.604.195-.615.2-.033.011-.023-.009.073-.158.427-.666 1.073-1.97 1.435-2.892.062-.16.122-.32.133-.356.015-.052.031-.07.08-.092a.149.149 0 01.065-.017zm-.728.3c.01.009-.174.398-.356.751-.351.686-.739 1.361-1.253 2.185l-.182.288c-.018.027-.026.018-.082-.094a3.307 3.307 0 01-.28-.842 3.39 3.39 0 01.02-1.083c.047-.227.045-.222.152-.276.462-.237 1.966-.942 1.981-.929zm6.268.255v.154a20.106 20.106 0 01-.255 2.992 9.362 9.362 0 01-1.898-.782c-.354-.194-.865-.507-.85-.522.003-.004.154-.083.334-.177.714-.37 1.395-.77 1.988-1.166.222-.148.555-.389.629-.454zM4.981 15.41c.015 0 .011.028-.012.161a4.137 4.137 0 00-.041.39c-.03.532.057.924.32 1.46.074.15.132.274.129.276-.027.023-2.43.726-3.186.933l-.435.12c-.027.008-.029.002-.02-.06.083-.533.49-1.232 1.058-1.82.378-.39.68-.622 1.195-.915a30.782 30.782 0 01.992-.545zm5.669 1.015c.002-.002.091.045.197.107.777.449 1.86.87 2.783 1.081l.084.02-.115.063c-.482.268-2.071.929-3.694 1.537a68.82 68.82 0 00-.513.194.314.314 0 01-.082.027c0-.004.067-.132.149-.286.456-.852.91-1.887 1.144-2.605.023-.073.044-.135.047-.138zm-.578.19a1.39 1.39 0 01-.063.169 23.534 23.534 0 01-1.261 2.54 9.009 9.009 0 01-.252.433c-.005 0-.114-.066-.244-.145-.77-.472-1.452-1.052-1.9-1.617l-.064-.08.332-.091a23.616 23.616 0 003.19-1.103c.142-.06.26-.109.262-.106zm3.59 1.253c.001 0 .002.001.002.003 0 .08-.183.828-.336 1.37-.128.453-.236.808-.435 1.437a8.533 8.533 0 01-.168.504 15.004 15.004 0 01-3-.841 7.964 7.964 0 01-.639-.283c-.006-.007.213-.11.486-.23 1.655-.721 3.369-1.543 3.955-1.896a.432.432 0 01.135-.064zm-8.287.283c.009.009-.454.671-1.1 1.576l-.587.823c-.097.139-.245.358-.329.488l-.153.236-.162-.137c-.191-.16-.525-.501-.677-.69-.312-.389-.523-.798-.607-1.174-.038-.174-.04-.262-.003-.273a176.26 176.26 0 011.934-.455l1.3-.305c.209-.05.382-.09.384-.089zm.465.178l.117.131a6.763 6.763 0 001.706 1.394c.115.066.202.124.195.128a281.967 281.967 0 01-4.33 1.53.858.858 0 01-.072-.048l-.067-.048.105-.152c.34-.493.768-1.035 1.705-2.162zm2.9 2.073c.003-.003.165.054.362.128.473.177.844.292 1.347.418.617.155 1.51.31 2.038.354.08.006.122.016.11.024-.025.016-.56.194-.953.318a258.526 258.526 0 01-4.636 1.363c-.035.007-.157-.025-.157-.04 0-.009.087-.119.193-.246a22.027 22.027 0 001.476-1.984 56.9 56.9 0 01.22-.335zm-.642.018c.005.005-.253.418-.706 1.132-.192.301-.409.645-.483.762-.075.118-.184.298-.242.4l-.107.185-.054-.014c-.13-.035-1.049-.36-1.291-.456-.301-.12-.615-.264-.846-.389-.289-.156-.655-.388-.627-.397l1.105-.302c1.592-.434 2.473-.683 3.05-.864.109-.033.199-.059.2-.057zm4.523 1.061h.006c.015.038-.575 1.67-.79 2.188-.049.116-.066.145-.092.143a55.54 55.54 0 01-1.433-.2c-.906-.138-2.423-.403-2.806-.49l-.089-.02.543-.122c1.164-.262 1.723-.403 2.29-.577a16.544 16.544 0 002.138-.824c.113-.052.21-.093.233-.098Z",
};

interface TechEntry {
  icon: TechIcon;
  label: string;
}

interface IcebergLayer {
  id: string;
  title: string;
  eyebrow: string;
  tools: string[];
  description: string;
  principle: string;
  tech: TechEntry[];
  widthClass: string;
  clipPath: string;
  /* Fraction of the slab width the clipped right edge sits in from the
     bounding box at mid-height — lets the connector start on the visible
     slanted edge instead of the rectangular bounds. */
  edgeInsetRatio: number;
}

const SLAB_SHEEN =
  "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 30%, rgba(0,0,0,0) 62%), radial-gradient(circle at 82% 18%, rgba(255,255,255,0.13), transparent 26%)";

/* Widths grow monotonically toward the base; each slab's top edge width
   equals the slab above's bottom width so the stack reads as one shape. */
const ICEBERG_LAYERS: IcebergLayer[] = [
  {
    id: "product-design",
    title: "User Experience",
    eyebrow: "What people see",
    tools: ["Design", "Copy", "Flow"],
    description:
      "I bring attention to how people move through a product, not only how it looks.",
    principle:
      "That helps turn loose ideas into screens people can understand and use.",
    tech: [
      { icon: siFigma, label: "Figma" },
      { icon: siFramer, label: "Framer Motion" },
      { icon: siGsap, label: "GSAP" },
    ],
    widthClass: "w-full sm:w-[46%]",
    clipPath: "polygon(10% 0, 90% 0, 100% 100%, 0 100%)",
    edgeInsetRatio: 0.05,
  },
  {
    id: "frontend",
    title: "App Screens",
    eyebrow: "What people use",
    tools: ["Pages", "Forms", "Dashboards"],
    description: "I can turn requirements into the pages, forms, and dashboards people use.",
    principle: "That means fewer handoffs between idea, design, and working interface.",
    tech: [
      { icon: siReact, label: "React" },
      { icon: siTypescript, label: "TypeScript" },
      { icon: siTailwindcss, label: "Tailwind" },
      { icon: siVite, label: "Vite" },
    ],
    widthClass: "w-full sm:w-[55%]",
    clipPath: "polygon(8.2% 0, 91.8% 0, 100% 100%, 0 100%)",
    edgeInsetRatio: 0.041,
  },
  {
    id: "backend",
    title: "App Logic",
    eyebrow: "What happens next",
    tools: ["Rules", "Accounts", "Workflows"],
    description:
      "I can work through the rules behind the screen: accounts, permissions, workflows, and updates.",
    principle:
      "That keeps the product behavior consistent when real people start using it.",
    tech: [
      { icon: siNodedotjs, label: "Node.js" },
      { icon: siExpress, label: "Express" },
      { icon: siTypescript, label: "TypeScript" },
    ],
    widthClass: "w-full sm:w-[64%]",
    clipPath: "polygon(7% 0, 93% 0, 100% 100%, 0 100%)",
    edgeInsetRatio: 0.035,
  },
  {
    id: "data",
    title: "Stored Information",
    eyebrow: "What the app remembers",
    tools: ["Records", "Reports", "History"],
    description:
      "I think about what the product needs to remember, report, and make easy to find later.",
    principle: "That helps the work stay useful after the first version ships.",
    tech: [
      { icon: siPostgresql, label: "PostgreSQL" },
      { icon: siKnexdotjs, label: "Knex.js" },
      { icon: siRedis, label: "Redis" },
      { icon: siMongodb, label: "MongoDB" },
      { icon: MSSQL_ICON, label: "MSSQL" },
    ],
    widthClass: "w-full sm:w-[73%]",
    clipPath: "polygon(6.2% 0, 93.8% 0, 100% 100%, 0 100%)",
    edgeInsetRatio: 0.031,
  },
  {
    id: "delivery",
    title: "Launch and Hosting",
    eyebrow: "Where it runs",
    tools: ["Hosting", "Deploys", "Speed"],
    description: "I can help get the work from local build to a place where people can actually use it.",
    principle: "That closes the gap between making something and putting it in front of users.",
    tech: [
      { icon: AWS_ICON, label: "AWS" },
      { icon: siGooglecloud, label: "GCP" },
      { icon: AZURE_ICON, label: "Azure" },
      { icon: siVercel, label: "Vercel" },
      { icon: siDocker, label: "Docker" },
      { icon: siGithubactions, label: "GH Actions" },
      { icon: siCloudflare, label: "Cloudflare" },
    ],
    widthClass: "w-full sm:w-[82%]",
    clipPath: "polygon(5.5% 0, 94.5% 0, 100% 100%, 0 100%)",
    edgeInsetRatio: 0.0275,
  },
  {
    id: "security",
    title: "Safety and Reliability",
    eyebrow: "How it stays safe",
    tools: ["Access", "Privacy", "Backups"],
    description:
      "I keep access, privacy, and recovery in mind while the product is being shaped.",
    principle:
      "That reduces avoidable risk before the product becomes harder to change.",
    tech: [
      { icon: siAuth0, label: "Auth0" },
      { icon: siCloudflare, label: "Cloudflare" },
      { icon: siSentry, label: "Sentry" },
    ],
    widthClass: "w-full sm:w-[91%]",
    clipPath: "polygon(4.9% 0, 95.1% 0, 100% 100%, 0 100%)",
    edgeInsetRatio: 0.0245,
  },
  {
    id: "ai-native",
    title: "AI-Assisted Building",
    eyebrow: "How I move faster",
    tools: ["Planning", "Coding", "Review"],
    description:
      "I use AI to move faster across planning, coding, testing, and review.",
    principle:
      "The speed is useful because it is paired with structure, review, and judgment.",
    tech: [
      { icon: siClaude, label: "Claude Code" },
      { icon: OPENAI_ICON, label: "Codex" },
      { icon: siGooglegemini, label: "Gemini" },
      { icon: siKimi, label: "Kimi" },
      { icon: siGithubcopilot, label: "Copilot" },
    ],
    widthClass: "w-full",
    clipPath: "polygon(4.5% 0, 95.5% 0, 100% 100%, 0 100%)",
    edgeInsetRatio: 0.0225,
  },
];

/* Drafting-style tower crane, composition-fixed: the mast stands at the
   pyramid's base corner and is tied into the structure with horizontal
   tie-in braces (as real tower cranes are), the jib stops short of the
   crown, and the block lands on the top layer's left shoulder — never on
   the apex cap. No figures. One shared 16s timeline: load, lift, slide,
   lower, place, retract, return. Geometry lives in a 768×720 viewBox
   stretched over the pyramid wrapper (wrapper x = viewBox x − 64) so it
   tracks the pyramid proportionally; the slope corner line runs (286,60)
   → (64,714), which the tie-in brace endpoints sit on. Decorative only. */
const CRANE_LOOP = { duration: 16, ease: "easeInOut" as const, repeat: Infinity };
const LATTICE_YS = Array.from({ length: 23 }, (_, i) => 14 + i * 30);
const JIB_XS = Array.from({ length: 9 }, (_, i) => 58 + i * 30);
const TIE_INS: Array<[number, number]> = [[250, 229], [450, 158], [650, 87]];
const BOX_TIMES = [0, 0.08, 0.42, 0.48, 0.72, 0.82, 0.88, 1];
const BOX_TOP = { ground: 702, lifted: 34, placed: 83 };
const TROLLEY_DX = 204;

function CraneScene({ isDark }: { isDark: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const ink = isDark ? "#d4d4d4" : "#1a1a1a";
  const rig = {
    stroke: ink,
    strokeOpacity: 0.75,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-16 right-0 z-0 hidden lg:block"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 768 720"
        preserveAspectRatio="none"
        fill="none"
        className="overflow-visible"
      >
        {/* mast, base, lattice, tie-in braces to the slope */}
        <g {...rig}>
          <line x1={44} y1={14} x2={44} y2={714} />
          <line x1={58} y1={14} x2={58} y2={714} />
          <line x1={30} y1={714} x2={72} y2={714} />
          {LATTICE_YS.map((y) => (
            <g key={y}>
              <line x1={44} y1={y} x2={58} y2={y + 30} />
              <line x1={58} y1={y} x2={44} y2={y + 30} />
            </g>
          ))}
          {TIE_INS.map(([y, x]) => (
            <g key={y}>
              <line x1={58} y1={y} x2={x} y2={y} />
              <line x1={x} y1={y - 4} x2={x} y2={y + 4} />
            </g>
          ))}
        </g>
        {/* jib (stops short of the crown), counter-jib, ties, weight, cab */}
        <g {...rig}>
          <line x1={58} y1={4} x2={334} y2={4} />
          <line x1={58} y1={14} x2={330} y2={14} />
          {JIB_XS.map((x) => (
            <line key={x} x1={x} y1={14} x2={x + 15} y2={4} />
          ))}
          <line x1={44} y1={4} x2={10} y2={4} />
          <line x1={44} y1={14} x2={14} y2={14} />
          <line x1={51} y1={-26} x2={330} y2={4} />
          <line x1={51} y1={-26} x2={14} y2={4} />
          <line x1={44} y1={4} x2={51} y2={-26} />
          <line x1={58} y1={4} x2={51} y2={-26} />
        </g>
        {/* trolley + cable + block, one synced timeline */}
        <motion.g
          animate={shouldReduceMotion
            ? undefined
            : { x: [0, 0, 0, TROLLEY_DX, TROLLEY_DX, TROLLEY_DX, TROLLEY_DX, 0] }}
          transition={shouldReduceMotion
            ? undefined
            : { ...CRANE_LOOP, times: BOX_TIMES }}
          style={shouldReduceMotion ? { x: TROLLEY_DX } : undefined}
        >
          <rect x={68} y={14} width={16} height={7} fill={ink} fillOpacity={0.9} />
          <motion.line
            x1={76}
            x2={76}
            y1={21}
            stroke={ink}
            strokeOpacity={0.8}
            strokeWidth={1.25}
            initial={{ y2: shouldReduceMotion ? 78 : 697 }}
            animate={shouldReduceMotion
              ? { y2: 78 }
              : { y2: [697, 697, 29, 29, 78, 29, 29, 697] }}
            transition={shouldReduceMotion
              ? { duration: 0 }
              : { ...CRANE_LOOP, times: [0, 0.08, 0.42, 0.72, 0.82, 0.88, 0.98, 1] }}
          />
          <motion.g
            animate={shouldReduceMotion
              ? undefined
              : {
                  y: [
                    BOX_TOP.ground, BOX_TOP.ground,
                    BOX_TOP.lifted, BOX_TOP.lifted, BOX_TOP.lifted,
                    BOX_TOP.placed, BOX_TOP.placed,
                    BOX_TOP.ground,
                  ],
                  opacity: [0, 0.9, 0.9, 0.9, 0.9, 0.9, 0, 0],
                }}
            transition={shouldReduceMotion
              ? undefined
              : { ...CRANE_LOOP, times: BOX_TIMES }}
            style={shouldReduceMotion
              ? { y: BOX_TOP.placed, opacity: 0.85 }
              : undefined}
          >
            <line x1={76} y1={-5} x2={76} y2={0} stroke={ink} strokeOpacity={0.8} strokeWidth={1.25} />
            <rect
              x={68}
              y={0}
              width={16}
              height={11}
              fill={isDark ? "#1f1f1f" : "#0a0a0a"}
              fillOpacity={0.88}
              stroke={ink}
              strokeOpacity={0.6}
              strokeWidth={1}
            />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}

/* Full-color tech logos are the single sanctioned chroma in this design
   system; near-black brand marks flip to light ink in dark mode. */
function techIconFill(icon: TechIcon, isDark: boolean): string {
  const r = parseInt(icon.hex.slice(0, 2), 16) / 255;
  const g = parseInt(icon.hex.slice(2, 4), 16) / 255;
  const b = parseInt(icon.hex.slice(4, 6), 16) / 255;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (isDark && luminance < 0.22) return "#ededed";
  if (!isDark && luminance > 0.88) return "#0a0a0a";
  return `#${icon.hex}`;
}

function TechTray({ layer, isDark }: { layer: IcebergLayer; isDark: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mt-4">
      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={layer.id}
          exit={shouldReduceMotion
            ? { opacity: 0, transition: { duration: 0.12 } }
            : { opacity: 0, y: -8, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } }}
          className="mt-2.5 flex flex-wrap gap-2"
        >
          {layer.tech.map((entry, index) => (
            <motion.li
              key={entry.icon.slug}
              initial={shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                delay: shouldReduceMotion ? 0 : index * 0.055,
              }}
              className={`flex items-center gap-2 rounded-md border px-3 py-2 ${
                isDark ? "border-dark-line bg-dark-elevated" : "border-black/15 bg-paper"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
                <path d={entry.icon.path} fill={techIconFill(entry.icon, isDark)} />
              </svg>
              <span
                className={`font-mono text-[0.64rem] uppercase tracking-[0.04em] ${
                  isDark ? "text-dark-ink" : "text-black"
                }`}
              >
                {entry.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}

function LayerButton({
  layer,
  index,
  isActive,
  onActivate,
  buttonRef,
  isDark,
}: {
  layer: IcebergLayer;
  index: number;
  isActive: boolean;
  onActivate: (index: number) => void;
  buttonRef: (element: HTMLButtonElement | null) => void;
  isDark: boolean;
}) {
  const slabStyle = isDark
    ? isActive
      ? "border-white/36 bg-black"
      : "border-white/12 bg-dark-elevated/95 group-hover:border-white/28 group-hover:bg-black"
    : isActive
      ? "border-white/40 bg-black"
      : "border-white/16 bg-black/90 group-hover:border-white/30 group-hover:bg-black";

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      data-connector-edge-inset={layer.edgeInsetRatio}
      aria-controls="technology-explanation"
      aria-pressed={isActive}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onActivate(index);
      }}
      onFocus={() => onActivate(index)}
      onPointerDown={() => onActivate(index)}
      onClick={() => onActivate(index)}
      whileHover={{ y: -2, scale: 1.008 }}
      whileTap={{ scale: 0.995 }}
      className={`group relative mx-auto block min-h-[4.5rem] ${layer.widthClass} py-3 text-center text-white transition-transform focus:outline-none`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 border shadow-[0_18px_46px_rgba(0,0,0,0.24)] transition-colors ${slabStyle}`}
        style={{ clipPath: layer.clipPath, backgroundImage: SLAB_SHEEN }}
      />
      <span className="relative z-10 block px-[9%] text-center">
        <span className="block font-mono text-[0.7rem] uppercase tracking-[0.04em] text-white/62">
          {layer.eyebrow}
        </span>
        <span className="mt-1 block font-display text-[clamp(1.1rem,1.9vw,1.65rem)] font-semibold leading-[0.98] tracking-normal text-white">
          {layer.title}
        </span>
        <span className="mx-auto mt-1.5 block max-w-[28rem] font-mono text-[0.66rem] leading-relaxed tracking-normal text-white/72">
          {layer.tools.join(" / ")}
        </span>
      </span>
    </motion.button>
  );
}

function FlowConnector({
  activeId,
  geometry,
  isDark,
}: {
  activeId: string;
  geometry: ElementConnectorGeometry | null;
  isDark: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  if (!geometry) return null;

  const connectorColor = isDark ? "#ededed" : "#0a0a0a";
  const surfaceColor = isDark ? "#0a0a0a" : "#ffffff";

  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full overflow-visible lg:block"
      preserveAspectRatio="none"
    >
      <path
        d={geometry.path}
        fill="none"
        stroke={connectorColor}
        strokeOpacity="0.28"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
      />
      {/* Draw-in line: animates pathLength ONLY. Framer implements pathLength
          via stroke-dasharray, so this path must never set its own dashes. */}
      <motion.path
        key={`${activeId}-draw`}
        d={geometry.path}
        fill="none"
        stroke={connectorColor}
        strokeWidth="2.25"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Flow dashes: marching-ants overlay animating strokeDashoffset ONLY.
          Offset delta is a multiple of the dash period (2 + 14) for a
          seamless loop. */}
      {!shouldReduceMotion && (
        <motion.path
          key={`${activeId}-flow`}
          d={geometry.path}
          fill="none"
          stroke={connectorColor}
          strokeWidth="3.5"
          strokeDasharray="3 13"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ opacity: 0, strokeDashoffset: 0 }}
          animate={{ opacity: 0.9, strokeDashoffset: -64 }}
          transition={{
            opacity: { duration: 0.3, delay: 0.3 },
            strokeDashoffset: { duration: 1.6, ease: "linear", repeat: Infinity },
          }}
        />
      )}
      <circle
        cx={geometry.startX}
        cy={geometry.startY}
        r="5"
        fill={surfaceColor}
        stroke={connectorColor}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <motion.circle
        cx={geometry.endX}
        cy={geometry.endY}
        fill={connectorColor}
        initial={{ r: 3, opacity: 0.5 }}
        animate={shouldReduceMotion
          ? { r: 3.5, opacity: 1 }
          : { r: [3, 5, 3], opacity: [0.5, 1, 0.5] }}
        transition={shouldReduceMotion
          ? { duration: 0 }
          : { duration: 1.4, ease: "easeInOut", repeat: Infinity }}
      />
    </svg>
  );
}

export default function Technologies({ isDark }: TechnologiesProps) {
  const [activeIndex, setActiveIndex] = useState(ICEBERG_LAYERS.length - 1);
  const connectorContainerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Array<HTMLElement | null>>([]);
  const detailTargetRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const activeLayer = ICEBERG_LAYERS[activeIndex];
  const inkText = isDark ? "text-dark-ink" : "text-black";
  const mutedText = isDark ? "text-dark-muted" : "text-muted";
  const lineText = isDark ? "text-dark-line" : "text-line";
  const connectorGeometry = useElementConnector({
    activeIndex,
    containerRef: connectorContainerRef,
    sourceRefs: layerRefs,
    targetRef: detailTargetRef,
  });

  return (
    <section
      id="technologies"
      data-theme-source={isDark ? "dark" : "light"}
      className={`relative scroll-mt-20 overflow-visible py-24 md:scroll-mt-24 md:py-32 ${
        isDark ? "bg-carbon text-dark-ink" : "bg-paper text-black"
      }`}
    >
      <div
        aria-hidden
        className={`absolute inset-0 blueprint-grid ${
          isDark ? "text-white !opacity-[0.018]" : "text-black !opacity-[0.032]"
        }`}
      />
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-px ${isDark ? "bg-dark-line" : "bg-black/10"}`}
      />
      <div
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-px ${isDark ? "bg-dark-line" : "bg-black/10"}`}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-6xl text-center"
        >
          <div className={`mb-5 flex items-center justify-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.04em] ${mutedText}`}>
            <span>Fig. 02</span>
            <span className={`h-px max-w-[120px] flex-1 dotted-x ${lineText}`} />
            <span>Product Stack</span>
          </div>
          <h2
            className={`font-display font-semibold leading-[1.04] tracking-normal xl:whitespace-nowrap ${inkText}`}
            style={{ fontSize: "clamp(2.05rem, 3vw, 2.65rem)" }}
          >
            Full stack is more than front-and-back-end.
          </h2>
          <p className={`mx-auto mt-5 max-w-3xl text-base leading-relaxed md:text-lg ${mutedText}`}>
            What I bring is range: I can move between user flow, interface,
            app behavior, data, launch details, safety, and AI-assisted
            execution without losing the bigger picture.
          </p>
        </motion.div>

        <div
          ref={connectorContainerRef}
          className="relative isolate mt-16 grid items-start gap-8 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 px-1 py-1 sm:px-3 lg:px-2 lg:py-3"
          >
            <div className="relative z-10 mx-auto flex w-full max-w-[44rem] flex-col gap-2 py-1 sm:gap-2.5">
              <CraneScene isDark={isDark} />
              {/* Apex cap: bottom width (80% of its box) matches the first
                  slab's top edge (10%–90% of 46%) so the silhouette stays
                  continuous. */}
              <div aria-hidden className="mx-auto hidden w-[46%] sm:block">
                <div
                  className={`h-20 border ${
                    isDark
                      ? "border-white/12 bg-dark-elevated/95"
                      : "border-white/16 bg-black/90"
                  }`}
                  style={{
                    clipPath: "polygon(50% 0, 90% 100%, 10% 100%)",
                    backgroundImage: SLAB_SHEEN,
                  }}
                />
              </div>
              {ICEBERG_LAYERS.map((layer, index) => (
                <div key={layer.id} className="flex flex-col gap-2">
                  <LayerButton
                    layer={layer}
                    index={index}
                    isActive={activeIndex === index}
                    onActivate={setActiveIndex}
                    buttonRef={(element) => {
                      layerRefs.current[index] = element;
                    }}
                    isDark={isDark}
                  />
                  {/* Mobile accordion: the card + tools render inline under
                      the tapped layer; opening another collapses this one. */}
                  <AnimatePresence initial={false}>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden lg:hidden"
                      >
                        <div
                          className={`rounded-md border p-4 text-white ${
                            isDark ? "border-white/12 bg-dark-elevated/95" : "border-white/16 bg-black/90"
                          }`}
                          style={{ backgroundImage: SLAB_SHEEN }}
                        >
                          <p className="text-sm leading-6 text-white/75">
                            {layer.description}
                          </p>
                          <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.04em] text-white/48">
                            Why it matters
                          </p>
                          <p className="mt-1 text-sm leading-6 text-white/80">
                            {layer.principle}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {layer.tech.map((entry) => (
                              <span
                                key={entry.icon.slug}
                                className="flex items-center gap-1.5 rounded-md border border-white/14 bg-black/50 px-2.5 py-1.5"
                              >
                                <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" aria-hidden>
                                  <path d={entry.icon.path} fill={techIconFill(entry.icon, true)} />
                                </svg>
                                <span className="font-mono text-[0.6rem] uppercase tracking-[0.04em] text-white/80">
                                  {entry.label}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative z-10 hidden lg:sticky lg:top-28 lg:block">
          <motion.aside
            id="technology-explanation"
            aria-live="polite"
            aria-atomic="true"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-lg border p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.28)] lg:p-6 ${
              isDark ? "border-white/12 bg-dark-elevated/95" : "border-white/16 bg-black/90"
            }`}
            style={{ backgroundImage: SLAB_SHEEN }}
          >
            <span
              ref={detailTargetRef}
              aria-hidden
              className="absolute -left-[0.4rem] top-[4.5rem] h-px w-px"
            />
            <motion.div
              key={activeLayer.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.04em] text-white/52">
                {activeLayer.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-3xl font-semibold leading-none tracking-normal">
                {activeLayer.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-white/72">
                {activeLayer.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {activeLayer.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/14 px-3 py-1.5 font-mono text-[0.64rem] uppercase tracking-[0.04em] text-white/76"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <div className="mt-6 border-t border-white/12 pt-5">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.04em] text-white/48">
                  Why it matters
                </p>
                <p className="mt-2 text-base leading-7 text-white/82">
                  {activeLayer.principle}
                </p>
              </div>
            </motion.div>
          </motion.aside>

          <TechTray layer={activeLayer} isDark={isDark} />
          </div>

          <FlowConnector
            activeId={activeLayer.id}
            geometry={connectorGeometry}
            isDark={isDark}
          />
        </div>
      </div>
    </section>
  );
}
