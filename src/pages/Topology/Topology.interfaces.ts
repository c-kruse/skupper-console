import { ModelStyle } from '@antv/g6';

export interface Entity {
  id: string;
  comboId?: string;
  label: string;
  img: string;
  x: number | null;
  y: number | null;
  nodeConfig?: ModelStyle;
}
