# 
# Haller.js için QUnit assert kodu oluşturucusu
# Turhan Coskun <turhan.coskun@gmail.com>
#

haller = ["iyelik", "i", "e", "de", "den"]
isim = ""

loop do

  puts "Bir isim giriniz: "
  isim = gets.chomp
  
  exit if isim == "quit"

  tests = []
  haller.each do |hal|
    puts "#{isim} isminin #{hal} halini giriniz:"
    halli_hali = gets.chomp
    tests << "\tassert.ok( Hal(\"#{isim}\", \"#{hal}\") === \"#{halli_hali}\", \"#{isim}: #{hal} hali #{halli_hali} olmalıdır.(\" + Hal(\"#{isim}\", \"#{hal}\") + \")\");"
  end

  tests.each { |test| puts test }

end
  
