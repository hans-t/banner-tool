import { generate as generateId } from 'shortid';


/**
 * Initialize bannerId object.
 */
export const initBannerId = ({ index, pageNum }) => ({
  id: generateId(),
  index,
  selected: false,
  visibleOnPageNum: pageNum,
});
