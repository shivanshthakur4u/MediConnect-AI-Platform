import React, { useState } from 'react';
import { X, Calendar, Clock, Video, MessageCircle, Phone, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Doctor } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  doctor: Doctor;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: () => void;
}

export function BookingModal({ doctor, isOpen, onClose, onBookingComplete }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'video' | 'chat' | 'phone'>('video');
  const [step, setStep] = useState<'datetime' | 'payment'>('datetime');

  const availableDates = [
    { date: '2024-01-20', day: 'Today', slots: ['10:00', '11:00', '14:00', '15:30'] },
    { date: '2024-01-21', day: 'Tomorrow', slots: ['09:00', '10:30', '13:00', '16:00'] },
    { date: '2024-01-22', day: 'Monday', slots: ['09:30', '11:00', '14:30', '17:00'] }
  ];

  const consultationTypes = [
    { type: 'video', label: 'Video Call', icon: Video, price: doctor.consultationFee },
    { type: 'chat', label: 'Chat', icon: MessageCircle, price: doctor.consultationFee - 10 },
    { type: 'phone', label: 'Phone Call', icon: Phone, price: doctor.consultationFee - 5 }
  ];

  const handleBooking = () => {
    // Simulate booking process
    setTimeout(() => {
      onBookingComplete();
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Book Consultation</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Doctor Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
              <img 
                src={doctor.profileImage} 
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-blue-600">{doctor.specialty}</p>
                <p className="text-sm text-gray-600">{doctor.experience} years experience</p>
              </div>
            </div>

            {step === 'datetime' && (
              <div className="space-y-6">
                {/* Consultation Type */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Select Consultation Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {consultationTypes.map(({ type, label, icon: Icon, price }) => (
                      <button
                        key={type}
                        onClick={() => setConsultationType(type as any)}
                        className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                          consultationType === type
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="font-medium">{label}</span>
                        <span className="text-sm">${price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Select Date</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {availableDates.map(({ date, day }) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-4 border-2 rounded-lg text-center transition-all ${
                          selectedDate === date
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{day}</div>
                        <div className="text-sm text-gray-600">{date}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Select Time</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {availableDates
                        .find(d => d.date === selectedDate)
                        ?.slots.map(slot => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`p-3 border-2 rounded-lg text-center transition-all ${
                              selectedTime === slot
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    onClick={() => setStep('payment')}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1"
                  >
                    Continue to Payment
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                {/* Booking Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Consultation Type:</span>
                      <span className="font-medium capitalize">{consultationType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-3 border-t">
                      <span>Total:</span>
                      <span>${consultationTypes.find(t => t.type === consultationType)?.price}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button onClick={handleBooking} className="flex-1">
                    Confirm Booking & Pay
                  </Button>
                  <Button variant="outline" onClick={() => setStep('datetime')}>
                    Back
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}