import { KeyConfig, NumberKeyboardProps } from './PropsType';

const genBasicKeys = (props: NumberKeyboardProps) => {
  const keys: KeyConfig[] = Array(9)
    .fill('')
    .map((_, i) => ({ text: i + 1 }));

  if (props.randomKeyOrder) {
    keys.sort(() => (Math.random() > 0.5 ? 1 : -1));
  }

  return keys;
};

export const genDefaultKeys = (props: NumberKeyboardProps): KeyConfig[] => [
  ...genBasicKeys(props),
  { text: props.extraKey as string, type: 'extra' },
  { text: 0 },
  {
    text: props.showDeleteKey ? props.deleteButtonText : '',
    type: props.showDeleteKey ? 'delete' : '',
  },
];

export const genCustomKeys = (props: NumberKeyboardProps) => {
  const keys = genBasicKeys(props);
  const { extraKey } = props;
  const extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];

  if (extraKeys.length === 1) {
    keys.push({ text: 0, wider: true }, { text: extraKeys[0], type: 'extra' });
  } else if (extraKeys.length === 2) {
    keys.push(
      { text: extraKeys[0], type: 'extra' },
      { text: 0 },
      { text: extraKeys[1], type: 'extra' },
    );
  }

  return keys;
};
