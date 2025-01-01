import { useEffect, useRef, useState } from 'react'
import { ChartSettings } from '../index.d'

const init = (config: ChartSettings) => {
  const defaultConfig = {
    ...config,
    marginLeft: config?.marginLeft || 32,
    marginRight: config?.marginRight || 32,
    marginTop: config?.marginTop || 32,
    marginBottom: config?.marginBottom || 64,
  }

  return {
    ...defaultConfig,
    boundedWidth: Math.max((defaultConfig.width || 0) - defaultConfig.marginLeft - defaultConfig.marginRight, 0),
    boundedHeight: Math.max((defaultConfig.height || 0) - defaultConfig.marginTop - defaultConfig.marginBottom, 0),
  }
}

export const useChartSettings = (config: ChartSettings) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  // ref that reference to chart
  const ref = useRef<HTMLDivElement | null>(null)

  // chart settings
  const settings = init(config)

  //listen to chart size changes
  useEffect(() => {
    //if width & height != 0 -> dont need to listen size changes
    if (settings.width && settings.height) return

    const resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0]

      if (width != entry.contentRect.width)
        setWidth(entry.contentRect.width)
      if (height != entry.contentRect.height)
        setHeight(entry.contentRect.height)
    })
    if (ref.current) {
      resizeObserver.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current)
      }
    }
  }, [])

  // new chart settings with new width & height
  const newSettings = init({
    ...settings,
    width: settings.width || width,
    height: settings.height || height,
  })

  return [ref, newSettings] as const
}