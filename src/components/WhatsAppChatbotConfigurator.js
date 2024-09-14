import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';

const defaultFAQs = [
  { question: "Qual é o prazo de entrega?", answer: "Nosso prazo de entrega padrão é de 3 a 5 dias úteis." },
  { question: "Como faço para rastrear meu pedido?", answer: "Você pode rastrear seu pedido usando o número de rastreamento enviado para seu e-mail." },
  { question: "Vocês aceitam devolução?", answer: "Sim, aceitamos devoluções em até 7 dias após o recebimento do produto." },
];

const WhatsAppChatbotConfigurator = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [step, setStep] = useState('test');
  const [faqList, setFaqList] = useState(defaultFAQs);
  const [companyInfo, setCompanyInfo] = useState({ name: 'Sua Empresa' });
  const [businessHours, setBusinessHours] = useState({
    weekdays: '09:00 às 18:00',
    weekends: '10:00 às 16:00',
  });
  const [outOfHoursMessage, setOutOfHoursMessage] = useState('Atualmente estamos fora do horário comercial. Por favor, deixe sua mensagem e entraremos em contato em breve.');

  const getBotResponse = (input) => {
    const currentTime = new Date().getHours();
    const isBusinessHours = currentTime >= 9 && currentTime < 18;

    if (!isBusinessHours) {
      return outOfHoursMessage;
    }

    if (input.includes('olá') || input.includes('oi')) {
      return Olá! Bem-vindo à [Nome da Empresa]. Como posso ajudar você hoje?.replace('[Nome da Empresa]', companyInfo.name);
    } else if (input.includes('horário')) {
      return Nosso horário de atendimento é ${businessHours.weekdays} de segunda a sexta, e ${businessHours.weekends} nos fins de semana.;
    } else {
      const matchedFaq = faqList.find(faq => input.includes(faq.question.toLowerCase()));
      if (matchedFaq) {
        return matchedFaq.answer;
      }
      return "Desculpe, não entendi sua pergunta. Pode reformular ou escolher uma das opções do nosso FAQ?";
    }
  };

  const handleUserInput = () => {
    if (inputMessage.trim() === '') return;

    setChatHistory(prev => [...prev, { sender: 'user', message: inputMessage }]);
    setInputMessage('');
    
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage.toLowerCase());
      setChatHistory(prev => [...prev, { sender: 'bot', message: botResponse }]);
    }, 1000);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <CardTitle className="text-2xl font-bold">Configurador Avançado de Chatbot WhatsApp</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={step} onValueChange={setStep}>
            <TabsList>
              <TabsTrigger value="test">Teste</TabsTrigger>
              {/* Adicione outros triggers de aba conforme necessário */}
            </TabsList>

            <TabsContent value="test">
              <h2 className="text-xl font-bold mb-4">Teste seu Chatbot</h2>
              <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={mb-4 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}}>
                    <span className={inline-block p-3 rounded-lg ${msg.sender === 'bot' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}}>
                      {msg.message}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
                  className="flex-grow"
                />
                <Button onClick={handleUserInput}>
                  <Send size={20} />
                </Button>
              </div>
            </TabsContent>

            {/* Adicione outras abas conforme necessário */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppChatbotConfigurator;
