'use client'

import { Fragment, useEffect, useState } from 'react'

import { Transition } from '@headlessui/react'
import {
  HiXMark,
  HiExclamationCircle,
  HiInformationCircle,
  HiCheckCircle,
} from 'react-icons/hi2'

export type MessageType = 'error' | 'warning' | 'success' | 'info'

interface ErrorMessageProps {
  type?: MessageType
  title: string
  message?: string
  show: boolean
  onClose?: () => void
  autoHide?: boolean
  autoHideDelay?: number
}

const icons = {
  error: HiExclamationCircle,
  warning: HiExclamationCircle,
  success: HiCheckCircle,
  info: HiInformationCircle,
}

const colors = {
  error: 'text-red-600 bg-red-50',
  warning: 'text-yellow-600 bg-yellow-50',
  success: 'text-green-600 bg-green-50',
  info: 'text-blue-600 bg-blue-50',
}

const iconColors = {
  error: 'text-red-500',
  warning: 'text-yellow-500',
  success: 'text-green-500',
  info: 'text-blue-500',
}

export default function ErrorMessage({
  type = 'error',
  title,
  message,
  show,
  onClose,
  autoHide = false,
  autoHideDelay = 5000,
}: ErrorMessageProps) {
  const [isVisible, setIsVisible] = useState(show)
  const Icon = icons[type]

  useEffect(() => {
    setIsVisible(show)
    return undefined
  }, [show])

  useEffect(() => {
    if (autoHide && show) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, autoHideDelay)

      return () => clearTimeout(timer)
    }
    return undefined
  }, [autoHide, autoHideDelay, show, onClose])

  return (
    <Transition
      show={isVisible}
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`rounded-md p-4 ${colors[type]}`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${iconColors[type]}`} aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className={`text-sm font-medium ${iconColors[type]}`}>{title}</h3>
            {message && (
              <div className={`mt-2 text-sm ${iconColors[type]}`}>
                <p>{message}</p>
              </div>
            )}
          </div>
          {onClose && (
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsVisible(false)
                    onClose()
                  }}
                  className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors[type]} ${iconColors[type]}`}
                >
                  <span className="sr-only">關閉</span>
                  <HiXMark className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Transition>
  )
}
