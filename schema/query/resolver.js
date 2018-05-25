import { getDats } from '../dat/helpers'

export default {
  getDats: (_, {}, { sbot, dat, paths }) => getDats(dat, paths.datPath),
}
